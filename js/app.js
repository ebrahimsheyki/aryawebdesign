"use strict";
/* ========================
   ES TECH
   Production Main JavaScript
   Version: 1.0.0

   Architecture:
   - Config
   - DOM Cache
   - Storage
   - Utilities
   - Controllers
   - App
========================= */

/* =====================
   CONFIG
====================== */
const CONFIG = Object.freeze({
  scrollOffset: 80,
  headerScrolled: 16,
  revealThreshold: 0.15,
  backToTopOffset: 320,
  storage: {
    theme: "estech.theme",
    language: "estech.language",
  },
  animation: {
    menuDuration: 300,
    revealDuration: 60,
  },
  breakpoints: {
    mobile: 768,
    desktop: 1024,
  },
});
/* ======================
   DOM CACHE
========================= */
const DOM = Object.freeze({
  html: document.documentElement,
  body: document.body,
  header: document.getElementById("mainHeader"),
  progressBar: document.getElementById("progressBar"),
  navLinks: document.getElementById("navLinks"),
  themeToggles: document.querySelectorAll(".theme-toggle"),
  languageToggles: document.querySelectorAll(".language-switcher"),
  languageLabels: document.querySelectorAll(".language-label"),
  menuToggle: document.getElementById("menuToggle"),
  mobileMenu: document.getElementById("mobileMenu"),
  mobileMenuClose: document.getElementById("mobileMenuClose"),
  mobileOverlay: document.getElementById("mobileOverlay"),
  backToTop: document.getElementById("backToTop"),
  faqItems: document.querySelectorAll(".faq-item"),
  revealItems: document.querySelectorAll(".reveal"),
  pageLinks: document.querySelectorAll('a[href^="#"]'),
  sections: document.querySelectorAll("section[id]"),
  mobileMenuLinks: document.querySelectorAll("#mobileMenu a"),
  langElements: document.querySelectorAll("[data-lang-key]"),
});
/* ==================
   STORAGE
==================== */
const Storage = Object.freeze({
  get(key, fallback = null) {
    try {
      return localStorage.getItem(key) ?? fallback;
    } catch {
      return fallback;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch {}
  },
});

/* ==================
   UTILITIES
==================== */
const Utils = Object.freeze({
  prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  },

  scrollTo(target) {
    target?.scrollIntoView({
      behavior: this.prefersReducedMotion() ? "auto" : "smooth",
      block: "start",
    });
  },
});

/* ================
   HELPERS
=================== */
const Helpers = Object.freeze({
  addClass(element, className) {
    element?.classList.add(className);
  },

  removeClass(element, className) {
    element?.classList.remove(className);
  },

  toggleClass(element, className, state) {
    element?.classList.toggle(className, state);
  },

  setAria(element, attribute, value) {
    element?.setAttribute(attribute, value);
  },
});
/* ================
   LOGGER
================= */
const Logger = Object.freeze({
  info(message) {
    console.info(`%c${message}`, "color:#8b5cf6;font-weight:600;");
  },

  warn(message) {
    console.warn(message);
  },

  error(message) {
    console.error(message);
  },
});

/* =====================
   THEME CONTROLLER
======================== */
const ThemeController = {
  init() {
    const savedTheme = Storage.get(CONFIG.storage.theme, "dark");

    const theme = savedTheme === "light" ? "light" : "dark";

    this.apply(theme);

    DOM.themeToggles.forEach((button) => {
      button.addEventListener("click", () => this.toggle());
    });
  },

  current() {
    return DOM.html.dataset.theme === "light" ? "light" : "dark";
  },

  toggle() {
    const nextTheme = this.current() === "dark" ? "light" : "dark";

    this.apply(nextTheme);
  },

  apply(theme) {
    const normalizedTheme = theme === "light" ? "light" : "dark";

    DOM.html.dataset.theme = normalizedTheme;

    Storage.set(CONFIG.storage.theme, normalizedTheme);

    this.updateControls(normalizedTheme);
  },

  updateControls(theme) {
    const isDark = theme === "dark";

    DOM.themeToggles.forEach((button) => {
      const icon = button.querySelector("i");

      if (!icon) return;

      icon.className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";

      button.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode",
      );

      button.setAttribute("aria-pressed", String(!isDark));
    });
  },
};

/* =====================
   LANGUAGE CONTROLLER
======================= */
/* =====================
   LANGUAGE CONTROLLER
======================= */
const languageCache = new WeakMap();

const LanguageController = {
  init() {
    this.cache();

    const savedLanguage = Storage.get(CONFIG.storage.language, "fa");

    const language = savedLanguage === "en" ? "en" : "fa";

    this.apply(language);

    DOM.languageToggles.forEach((button) => {
      button.addEventListener("click", () => this.toggle());
    });
  },

  cache() {
    DOM.langElements.forEach((element) => {
      languageCache.set(element, element.innerHTML);
    });
  },

  current() {
    return DOM.html.dataset.language === "en" ? "en" : "fa";
  },

  toggle() {
    const nextLanguage = this.current() === "fa" ? "en" : "fa";

    this.apply(nextLanguage);
  },

  apply(language) {
    const normalizedLanguage = language === "en" ? "en" : "fa";

    const isPersian = normalizedLanguage === "fa";

    DOM.html.lang = normalizedLanguage;

    DOM.html.dir = isPersian ? "rtl" : "ltr";

    DOM.html.dataset.language = normalizedLanguage;

    DOM.html.dataset.direction = isPersian ? "rtl" : "ltr";

    this.translate(normalizedLanguage);

    this.updateControls(normalizedLanguage);

    Storage.set(CONFIG.storage.language, normalizedLanguage);
  },

  updateControls(language) {
    const isPersian = language === "fa";

    DOM.languageLabels.forEach((label) => {
      label.textContent = isPersian ? "EN" : "FA";
    });

    DOM.languageToggles.forEach((button) => {
      button.setAttribute(
        "aria-label",
        isPersian ? "Switch to English" : "Switch to Persian",
      );

      button.setAttribute("aria-pressed", String(!isPersian));
    });
  },

  translate(language) {
    const translations = TRANSLATIONS[language];

    DOM.langElements.forEach((element) => {
      if (language === "fa") {
        const originalContent = languageCache.get(element);

        if (originalContent !== undefined) {
          element.innerHTML = originalContent;
        }

        return;
      }

      const key = element.dataset.langKey;

      const value = translations?.[key];

      if (value !== undefined) {
        element.innerHTML = value;
      }
    });
  },
};

/* ========================
   MOBILE MENU CONTROLLER
========================== */
const MobileMenuController = {
  initialized: false,
  isOpen: false,
  init() {
    if (this.initialized) return;
    this.initialized = true;

    DOM.menuToggle?.addEventListener("click", () => this.open());

    DOM.mobileMenuClose?.addEventListener("click", () => this.close());

    DOM.mobileMenuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        this.close();
      });
    });

    DOM.mobileOverlay?.addEventListener("pointerdown", () => this.close());

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && this.isOpen) {
        this.close();
      }
      this.trapFocus(event);
    });

    window.addEventListener(
      "resize",
      () => {
        if (window.innerWidth >= CONFIG.breakpoints.desktop && this.isOpen) {
          this.close();
        }
      },

      {
        passive: true,
      },
    );
  },

  open() {
    if (this.isOpen) return;

    this.isOpen = true;

    DOM.body.classList.remove("menu-closing");

    DOM.body.classList.add("menu-opening");

    requestAnimationFrame(() => {
      DOM.body.classList.remove("menu-opening");

      DOM.body.classList.add("menu-open");
    });

    DOM.menuToggle.setAttribute("aria-expanded", "true");

    DOM.mobileMenu.setAttribute("aria-hidden", "false");

    requestAnimationFrame(() => {
      DOM.mobileMenu.focus();
    });
  },

  close() {
    if (!this.isOpen) return;
    this.isOpen = false;

    DOM.body.classList.remove("menu-open");

    DOM.body.classList.add("menu-closing");

    requestAnimationFrame(() => {
      DOM.body.classList.remove("menu-closing");
    });

    DOM.body.classList.remove("menu-open");

    DOM.mobileMenu.classList.remove("menu-open");

    DOM.mobileOverlay.classList.remove("menu-open");

    DOM.menuToggle.setAttribute("aria-expanded", "false");

    DOM.mobileMenu.setAttribute("aria-hidden", "true");

    DOM.menuToggle.focus();
  },

  trapFocus(event) {
    if (!this.isOpen || event.key !== "Tab") {
      return;
    }

    const focusable = DOM.mobileMenu.querySelectorAll(
      "a[href], button:not([disabled])",
    );

    if (!focusable.length) return;

    const first = focusable[0];

    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  },

  destroy() {},
};
/* =========================
   SCROLL CONTROLLER
============================ */
const ScrollController = {
  ticking: false,

  init() {
    window.addEventListener("scroll", () => this.onScroll(), { passive: true });

    this.update();
  },

  onScroll() {
    if (this.ticking) return;
    this.ticking = true;

    requestAnimationFrame(() => {
      this.update();
      this.ticking = false;
    });
  },

  update() {
    this.updateHeader();
    this.updateProgress();
    this.updateBackToTop();
    this.updateActiveLinks();
  },

  updateHeader() {
    DOM.header?.classList.toggle(
      "is-scrolled",
      window.scrollY > CONFIG.headerScrolled,
    );
  },

 updateProgress() {
  if (!DOM.progressBar) return;
  const documentHeight = document.documentElement.scrollHeight;
  const viewportHeight = window.innerHeight;
  const scrollableHeight = documentHeight - viewportHeight;

  if (scrollableHeight <= 0) {
    DOM.progressBar.style.transform = "scaleX(0)";
    return;
  }

  const progress = Math.min(Math.max(window.scrollY / scrollableHeight, 0), 1, );
  DOM.progressBar.style.transform = `scaleX(${progress})`;
},

  updateBackToTop() {
    if (!DOM.backToTop) return;
    DOM.backToTop.classList.toggle(
      "is-visible",
      window.scrollY > CONFIG.backToTopOffset,
    );
  },

  updateActiveLinks() {
    let current = "";
    DOM.sections.forEach((section) => {
      const top = section.offsetTop - CONFIG.scrollOffset;

      if (window.scrollY >= top) {
        current = section.id;
      }
    });

    DOM.navLinks?.querySelectorAll("a").forEach((link) => {
      link.classList.toggle(
        "is-active",
        link.getAttribute("href") === `#${current}`,
      );
    });
  },

  destroy() {},
};
/* =====================
   REVEAL CONTROLLER
======================== */
const RevealController = {
  observer: null,
  init() {
    if (Utils.prefersReducedMotion()) {
      DOM.revealItems.forEach((item) => {
        item.classList.add("is-visible");
      });
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");

          this.observer.unobserve(entry.target);
        });
      },

      {
        threshold: CONFIG.revealThreshold,
      },
    );
    DOM.revealItems.forEach((item) => {
      this.observer.observe(item);
    });
  },

  destroy() {},
};
/* =====================
   FAQ CONTROLLER
====================== */
const FAQController = {
  init() {
    DOM.faqItems.forEach((item) => {
      item.addEventListener("toggle", () => {
        if (!item.open) return;

        DOM.faqItems.forEach((other) => {
          if (other !== item) {
            other.open = false;
          }
        });
      });
    });
  },

  destroy() {},
};
/* ======================
   NAVIGATION CONTROLLER
======================== */
const NavigationController = {
  init() {
    DOM.pageLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        const target = document.querySelector(link.getAttribute("href"));
        if (!target) return;
        event.preventDefault();
        Utils.scrollTo(target);
      });
    });
  },

  destroy() {},
};
/* ==================
   APP
====================== */
const APP_VERSION = "1.0.0";
const App = {
  init() {
    ThemeController.init();
    LanguageController.init();
    MobileMenuController.init();
    ScrollController.init();
    RevealController.init();
    FAQController.init();
    NavigationController.init();
  },
};

document.addEventListener("DOMContentLoaded", () => App.init());
