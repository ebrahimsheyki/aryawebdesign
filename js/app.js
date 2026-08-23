"use strict";

/*
 * X Web Design — shared frontend behavior.
 *
 * Architecture:
 * - HTML owns localized content and navigation.
 * - CSS owns presentation.
 * - JavaScript owns progressive enhancement and UI behavior.
 * - Language selection is URL-based; no runtime translation engine is used.
 */

const CONFIG = Object.freeze({
  headerScrolled: 16,
  revealThreshold: 0.15,
  backToTopOffset: 320,
  scrollTargetOffset: 8,
  desktopBreakpoint: 1024,
  themeStorageKey: "arya.theme",
});

const DOM = Object.freeze({
  html: document.documentElement,
  body: document.body,
  header: document.getElementById("mainHeader"),
  progressBar: document.getElementById("progressBar"),
  navItems: document.querySelectorAll(".desktop-nav-link"),
  themeToggles: document.querySelectorAll(".theme-toggle"),
  menuToggle: document.getElementById("menuToggle"),
  mobileMenu: document.getElementById("mobileMenu"),
  mobileMenuClose: document.getElementById("mobileMenuClose"),
  mobileOverlay: document.getElementById("mobileOverlay"),
  backToTop: document.getElementById("backToTop"),
  faqItems: document.querySelectorAll(".faq-item"),
  revealItems: document.querySelectorAll(".reveal"),
  pageLinks: document.querySelectorAll('a[href^="#"]:not(#backToTop)'),
  sections: document.querySelectorAll("#services, #process, #why-us, #contact"),
  mobileMenuLinks: document.querySelectorAll("#mobileMenu a"),
});

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
    } catch {
      // Storage may be unavailable in restricted browsing contexts.
    }
  },
});

const Utils = Object.freeze({
  prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  },

  getHeaderHeight() {
    return DOM.header?.getBoundingClientRect().height ?? 0;
  },

  scrollTo(target) {
    if (!target) return;

    const targetTop =
      window.scrollY +
      target.getBoundingClientRect().top -
      Utils.getHeaderHeight() -
      CONFIG.scrollTargetOffset;

    window.scrollTo({
      top: Math.max(0, targetTop),
      left: 0,
      behavior: Utils.prefersReducedMotion() ? "auto" : "smooth",
    });
  },

  scrollToTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: Utils.prefersReducedMotion() ? "auto" : "smooth",
    });
  },
});

const ThemeController = {
  init() {
    this.apply(Storage.get(CONFIG.themeStorageKey, "dark"));

    DOM.themeToggles.forEach((button) => {
      button.addEventListener("click", () => this.toggle());
    });
  },

  current() {
    return DOM.html.dataset.theme === "light" ? "light" : "dark";
  },

  toggle() {
    this.apply(this.current() === "dark" ? "light" : "dark");
  },

  apply(theme) {
    const normalizedTheme = theme === "light" ? "light" : "dark";

    DOM.html.dataset.theme = normalizedTheme;
    Storage.set(CONFIG.themeStorageKey, normalizedTheme);
    this.updateControls(normalizedTheme);
  },

  updateControls(theme) {
    const isDark = theme === "dark";
    const language = DOM.html.lang === "en" ? "en" : "fa";

    DOM.themeToggles.forEach((button) => {
      const icon = button.querySelector("i");

      if (icon) {
        icon.className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";
      }

      button.setAttribute(
        "aria-label",
        language === "fa"
          ? isDark
            ? "تغییر به حالت روشن"
            : "تغییر به حالت تاریک"
          : isDark
            ? "Switch to light mode"
            : "Switch to dark mode",
      );
    });
  },
};

const HeroDescriptionController = {
  element: null,
  textElement: null,
  mediaQuery: null,
  reducedMotionQuery: null,
  desktopDescription: "",
  sentences: [],
  currentIndex: 0,
  animationFrameId: null,
  timeoutId: null,

  config: Object.freeze({
    mobileBreakpoint: 768,
    scrambleDuration: 1000,
    holdDuration: 2800,
    latinCharacters:
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    numberCharacters: "0123456789",
    persianCharacters:
      "ابتثجحخدذرزسشصضطظعغفقکگلمنوهی",
    symbols: "!@#$%&*+=?<>",
    staticCharacters: " \u00A0.,!?،؛:-–—()[]{}«»/\\",
  }),

  init() {
    this.element = document.querySelector(".hero-description");
    this.textElement = this.element?.querySelector(
      ".hero-description-text",
    );

    if (!this.element || !this.textElement) return;

    this.desktopDescription = this.element.dataset.heroDesktop ?? "";

    try {
      const value = JSON.parse(this.element.dataset.heroSentences ?? "[]");
      this.sentences = Array.isArray(value) ? value.filter(Boolean) : [];
    } catch {
      this.sentences = [];
    }

    if (!this.desktopDescription && !this.sentences.length) return;

    this.mediaQuery = window.matchMedia(
      `(max-width: ${this.config.mobileBreakpoint}px)`,
    );

    this.reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    this.mediaQuery.addEventListener("change", () => this.refresh());
    this.reducedMotionQuery.addEventListener("change", () => this.refresh());
    document.addEventListener("visibilitychange", () => this.refresh());

    this.refresh();
  },

  refresh() {
    this.stop();

    if (!this.isAnimated()) {
      this.renderDesktop();
      return;
    }

    if (document.hidden || this.sentences.length === 0) {
      this.renderDesktop();
      return;
    }

    this.play();
  },

  play() {
    if (!this.isAnimated() || !this.sentences.length) {
      this.renderDesktop();
      return;
    }

    const target = this.sentences[this.currentIndex];
    if (typeof target !== "string" || !target) return;

    this.animate(target);
  },

  animate(target) {
    this.cancelAnimation();
    this.element.classList.add("is-scrambling");

    const characters = Array.from(target);
    const startTime = performance.now();

    const frame = (now) => {
      if (!this.isAnimated() || document.hidden) {
        this.renderDesktop();
        return;
      }

      const progress = Math.min(
        (now - startTime) / this.config.scrambleDuration,
        1,
      );
      const eased = 1 - Math.pow(1 - progress, 3);
      const resolvePoint = eased * characters.length;

      const output = characters.map((character, index) => {
        if (this.isStaticCharacter(character) || index < resolvePoint) {
          return character;
        }

        return this.randomCharacter(character);
      });

      this.render(output.join(""));

      if (progress < 1) {
        this.animationFrameId = requestAnimationFrame(frame);
        return;
      }

      this.render(target);
      this.element.classList.remove("is-scrambling");

      this.timeoutId = window.setTimeout(() => {
        this.currentIndex =
          (this.currentIndex + 1) % Math.max(this.sentences.length, 1);
        this.play();
      }, this.config.holdDuration);
    };

    this.animationFrameId = requestAnimationFrame(frame);
  },

  render(value) {
    if (this.textElement) this.textElement.textContent = value;
  },

  renderDesktop() {
    this.element?.classList.remove("is-scrambling");
    this.render(this.desktopDescription);
  },

  randomCharacter(target) {
    const isPersian = /[\u0600-\u06FF]/.test(target);
    const pool = isPersian
      ? this.config.persianCharacters
      : this.config.latinCharacters +
        this.config.numberCharacters +
        this.config.symbols;

    let character;
    do {
      character = pool[Math.floor(Math.random() * pool.length)];
    } while (character === target && pool.length > 1);

    return character;
  },

  isStaticCharacter(character) {
    return this.config.staticCharacters.includes(character);
  },

  isAnimated() {
    return (
      this.mediaQuery?.matches === true &&
      this.reducedMotionQuery?.matches !== true
    );
  },

  cancelAnimation() {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    if (this.timeoutId !== null) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  },

  stop() {
    this.cancelAnimation();
    this.element?.classList.remove("is-scrambling");
  },
};

const MobileMenuController = {
  isOpen: false,
  previousFocus: null,

  init() {
    if (!DOM.mobileMenu) return;

    if ("inert" in DOM.mobileMenu) {
      DOM.mobileMenu.inert = true;
    }

    DOM.menuToggle?.addEventListener("click", () => this.toggle());
    DOM.mobileMenuClose?.addEventListener("click", () => this.close());
    DOM.mobileMenuLinks.forEach((link) => {
      link.addEventListener("click", () => this.close());
    });
    DOM.mobileOverlay?.addEventListener("pointerdown", () => this.close());

    document.addEventListener("keydown", (event) => {
      if (!this.isOpen) return;

      if (event.key === "Escape") {
        event.preventDefault();
        this.close();
        return;
      }

      this.trapFocus(event);
    });

    window.addEventListener(
      "resize",
      () => {
        if (window.innerWidth >= CONFIG.desktopBreakpoint) this.close();
      },
      { passive: true },
    );
  },

  toggle() {
    this.isOpen ? this.close() : this.open();
  },

  open() {
    if (this.isOpen) return;

    this.previousFocus = document.activeElement;
    this.isOpen = true;

    DOM.body?.classList.add("menu-open");
    DOM.menuToggle?.setAttribute("aria-expanded", "true");
    DOM.mobileMenu?.setAttribute("aria-hidden", "false");

    if (DOM.mobileMenu && "inert" in DOM.mobileMenu) {
      DOM.mobileMenu.inert = false;
    }

    requestAnimationFrame(() => DOM.mobileMenuClose?.focus());
  },

  close() {
    if (!this.isOpen) return;

    this.isOpen = false;
    DOM.body?.classList.remove("menu-open");
    DOM.mobileMenu?.setAttribute("aria-hidden", "true");
    DOM.menuToggle?.setAttribute("aria-expanded", "false");

    if (DOM.mobileMenu && "inert" in DOM.mobileMenu) {
      DOM.mobileMenu.inert = true;
    }

    const focusTarget =
      this.previousFocus instanceof HTMLElement &&
      document.contains(this.previousFocus)
        ? this.previousFocus
        : DOM.menuToggle;

    focusTarget?.focus();
    this.previousFocus = null;
  },

  getFocusableElements() {
    if (!DOM.mobileMenu) return [];

    return Array.from(
      DOM.mobileMenu.querySelectorAll(
        [
          "a[href]",
          "button:not([disabled])",
          "input:not([disabled])",
          "select:not([disabled])",
          "textarea:not([disabled])",
          '[tabindex]:not([tabindex="-1"])',
        ].join(","),
      ),
    ).filter(
      (element) =>
        element instanceof HTMLElement && element.offsetParent !== null,
    );
  },

  trapFocus(event) {
    if (event.key !== "Tab") return;

    const focusable = this.getFocusableElements();
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
};

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

    const scrollableHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const progress =
      scrollableHeight > 0
        ? Math.min(Math.max(window.scrollY / scrollableHeight, 0), 1)
        : 0;

    DOM.progressBar.style.transform = `scaleX(${progress})`;
  },

  updateBackToTop() {
    DOM.backToTop?.classList.toggle(
      "is-visible",
      window.scrollY > CONFIG.backToTopOffset,
    );
  },

  updateActiveLinks() {
    if (!DOM.navItems.length || !DOM.sections.length) return;

    const activationLine = Utils.getHeaderHeight() + 1;
    let current = "";

    for (const section of DOM.sections) {
      const rect = section.getBoundingClientRect();
      if (rect.top <= activationLine && rect.bottom > activationLine) {
        current = section.id;
        break;
      }
    }

    DOM.navItems.forEach((link) => {
      link.classList.toggle(
        "is-active",
        link.getAttribute("href") === `#${current}`,
      );
    });
  },
};

const RevealController = {
  init() {
    if (!DOM.revealItems.length) return;

    if (
      Utils.prefersReducedMotion() ||
      !("IntersectionObserver" in window)
    ) {
      DOM.revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: CONFIG.revealThreshold },
    );

    DOM.revealItems.forEach((item) => observer.observe(item));
  },
};

const FAQController = {
  init() {
    DOM.faqItems.forEach((item) => {
      item.addEventListener("toggle", () => {
        if (!item.open) return;

        DOM.faqItems.forEach((other) => {
          if (other !== item) other.open = false;
        });
      });
    });
  },
};

const NavigationController = {
  init() {
    DOM.pageLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        const href = link.getAttribute("href");
        if (!href || href === "#") return;

        const target = document.getElementById(href.slice(1));
        if (!target) return;

        event.preventDefault();
        if (MobileMenuController.isOpen) MobileMenuController.close();

        Utils.scrollTo(target);

        if (history.replaceState) {
          history.replaceState(null, "", href);
        }
      });
    });

    DOM.backToTop?.addEventListener("click", (event) => {
      event.preventDefault();
      Utils.scrollToTop();

      if (history.replaceState) {
        history.replaceState(
          null,
          "",
          window.location.pathname + window.location.search,
        );
      }
    });
  },
};

const CurrentYearController = {
  init() {
    const year = new Date().getFullYear();
    document.querySelectorAll("[data-current-year]").forEach((element) => {
      element.textContent = `© ${year}`;
    });
  },
};

const App = {
  init() {
    ThemeController.init();
    HeroDescriptionController.init();
    MobileMenuController.init();
    ScrollController.init();
    RevealController.init();
    FAQController.init();
    NavigationController.init();
    CurrentYearController.init();
  },
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => App.init(), { once: true });
} else {
  App.init();
}
