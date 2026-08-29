"use strict";

/*
 * X Web Design — shared frontend behavior.
 *
 * Architecture:
 * - HTML owns localized content and navigation.
 * - CSS owns presentation and animation.
 * - JavaScript owns progressive enhancement and UI behavior.
 * - Language selection is URL-based.
 * - Shared reveal behavior uses data-reveal-* attributes.
 */

const CONFIG = Object.freeze({
  headerScrolled: 16,
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

  pageLinks: document.querySelectorAll('a[href^="#"]:not(#backToTop)'),

  mobileMenuLinks: document.querySelectorAll("#mobileMenu a"),
});

/* ==========================================================================
   STORAGE
   ========================================================================== */

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

/* ==========================================================================
   UTILITIES
   ========================================================================== */

const Utils = Object.freeze({
  prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  },

  getHeaderHeight() {
    return DOM.header?.getBoundingClientRect().height ?? 0;
  },

  getLanguage() {
    return DOM.html.lang === "en" ? "en" : "fa";
  },

  normalizePath(pathname) {
    const normalized = pathname.replace(/\/+$/, "");
    return normalized || "/";
  },

  scrollTo(target) {
    if (!(target instanceof HTMLElement)) return;

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

/* ==========================================================================
   THEME
   ========================================================================== */

const ThemeController = {
  init() {
    this.apply(Storage.get(CONFIG.themeStorageKey, "dark"), false);

    DOM.themeToggles.forEach((button) => {
      button.addEventListener("click", () => {
        this.toggle();
      });
    });
  },

  current() {
    return DOM.html.dataset.theme === "light" ? "light" : "dark";
  },

  toggle() {
    this.apply(this.current() === "dark" ? "light" : "dark");
  },

  apply(theme, persist = true) {
    const normalizedTheme = theme === "light" ? "light" : "dark";

    DOM.html.dataset.theme = normalizedTheme;

    if (persist) {
      Storage.set(CONFIG.themeStorageKey, normalizedTheme);
    }

    this.updateControls(normalizedTheme);
  },

  updateControls(theme) {
    const isDark = theme === "dark";
    const language = Utils.getLanguage();

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

/* ==========================================================================
   HERO DESCRIPTION
   ========================================================================== */

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

    latinCharacters: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",

    numberCharacters: "0123456789",

    persianCharacters: "ابتثجحخدذرزسشصضطظعغفقکگلمنوهی",

    symbols: "!@#$%&*+=?<>",

    staticCharacters: " \u00A0.,!?،؛:-–—()[]{}«»/\\",
  }),

  init() {
    this.element = document.querySelector(".hero-description");

    this.textElement = this.element?.querySelector(".hero-description-text");

    if (!this.element || !this.textElement) {
      return;
    }

    this.desktopDescription = this.element.dataset.heroDesktop ?? "";

    try {
      const value = JSON.parse(this.element.dataset.heroSentences ?? "[]");

      this.sentences = Array.isArray(value)
        ? value.filter((sentence) => typeof sentence === "string" && sentence.length > 0)
        : [];
    } catch {
      this.sentences = [];
    }

    if (!this.desktopDescription && !this.sentences.length) {
      return;
    }

    this.mediaQuery = window.matchMedia(`(max-width: ${this.config.mobileBreakpoint}px)`);

    this.reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

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

    if (typeof target !== "string" || !target) {
      this.renderDesktop();
      return;
    }

    this.animate(target);
  },

  animate(target) {
    this.cancelAnimation();

    this.element?.classList.add("is-scrambling");

    const characters = Array.from(target);
    const startTime = performance.now();

    const frame = (now) => {
      if (!this.isAnimated() || document.hidden) {
        this.renderDesktop();
        return;
      }

      const progress = Math.min((now - startTime) / this.config.scrambleDuration, 1);

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

      this.element?.classList.remove("is-scrambling");

      this.timeoutId = window.setTimeout(() => {
        this.currentIndex = (this.currentIndex + 1) % this.sentences.length;

        this.play();
      }, this.config.holdDuration);
    };

    this.animationFrameId = requestAnimationFrame(frame);
  },

  render(value) {
    if (this.textElement) {
      this.textElement.textContent = value;
    }
  },

  renderDesktop() {
    this.element?.classList.remove("is-scrambling");

    this.render(this.desktopDescription);
  },

  randomCharacter(target) {
    const isPersian = /[\u0600-\u06FF]/.test(target);

    const pool = isPersian
      ? this.config.persianCharacters
      : this.config.latinCharacters + this.config.numberCharacters + this.config.symbols;

    if (!pool.length) {
      return target;
    }

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
    return this.mediaQuery?.matches === true && this.reducedMotionQuery?.matches !== true;
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

/* ==========================================================================
   MOBILE MENU
   ========================================================================== */

const MobileMenuController = {
  isOpen: false,
  previousFocus: null,

  init() {
    if (!DOM.mobileMenu) return;

    DOM.menuToggle?.addEventListener("click", () => this.toggle());

    DOM.mobileMenuClose?.addEventListener("click", () => this.close());

    DOM.mobileMenuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        this.close();
      });
    });

    DOM.mobileOverlay?.addEventListener("click", () => this.close());

    document.addEventListener("keydown", (event) => {
      if (!this.isOpen) return;

      if (event.key === "Escape") {
        event.preventDefault();
        this.close();
        return;
      }

      this.trapFocus(event);
    });

    this.desktopQuery = window.matchMedia(`(min-width: ${CONFIG.desktopBreakpoint}px)`);

    this.desktopQuery.addEventListener("change", (event) => {
      if (event.matches) {
        this.close({
          restoreFocus: false,
        });
      }
    });
  },

  toggle() {
    if (this.isOpen) {
      this.close();
      return;
    }

    this.open();
  },

  open() {
    if (this.isOpen || !DOM.mobileMenu) {
      return;
    }

    this.previousFocus =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    this.isOpen = true;

    DOM.body?.classList.add("menu-open");

    DOM.mobileMenu.setAttribute("aria-hidden", "false");

    DOM.mobileMenu.removeAttribute("inert");

    DOM.mobileOverlay?.setAttribute("aria-hidden", "false");

    this.updateTriggerState(true);

    requestAnimationFrame(() => {
      if (this.isOpen) {
        DOM.mobileMenuClose?.focus();
      }
    });
  },

  close(options = {}) {
    const { restoreFocus = true } = options;

    if (!this.isOpen) return;

    this.isOpen = false;

    DOM.body?.classList.remove("menu-open");

    DOM.mobileMenu?.setAttribute("aria-hidden", "true");

    DOM.mobileMenu?.setAttribute("inert", "");

    DOM.mobileOverlay?.setAttribute("aria-hidden", "true");

    this.updateTriggerState(false);

    if (restoreFocus) {
      const focusTarget =
        this.previousFocus instanceof HTMLElement && document.contains(this.previousFocus)
          ? this.previousFocus
          : DOM.menuToggle;

      focusTarget?.focus();
    }

    this.previousFocus = null;
  },

  updateTriggerState(open) {
    const language = Utils.getLanguage();

    DOM.menuToggle?.setAttribute("aria-expanded", String(open));

    DOM.menuToggle?.setAttribute(
      "aria-label",
      language === "fa" ? (open ? "بستن منو" : "باز کردن منو") : open ? "Close menu" : "Open menu",
    );
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
    ).filter((element) => element instanceof HTMLElement && element.getClientRects().length > 0);
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

/* ==========================================================================
   SCROLL
   ========================================================================== */

const ScrollController = {
  ticking: false,

  init() {
    window.addEventListener("scroll", () => this.onScroll(), {
      passive: true,
    });

    this.update();
    this.updateActiveLinks();

    window.addEventListener("popstate", () => {
      this.updateActiveLinks();
    });
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
  },

  updateHeader() {
    DOM.header?.classList.toggle("is-scrolled", window.scrollY > CONFIG.headerScrolled);
  },

  updateProgress() {
    if (!DOM.progressBar) return;

    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;

    const progress =
      scrollableHeight > 0 ? Math.min(Math.max(window.scrollY / scrollableHeight, 0), 1) : 0;

    DOM.progressBar.style.transform = `scaleX(${progress})`;
  },

  updateBackToTop() {
    DOM.backToTop?.classList.toggle("is-visible", window.scrollY > CONFIG.backToTopOffset);
  },

  updateActiveLinks() {
    if (!DOM.navItems.length) return;

    const currentPath = Utils.normalizePath(window.location.pathname);

    DOM.navItems.forEach((link) => {
      const href = link.getAttribute("href");

      if (!href) return;

      let linkPath;

      try {
        const url = new URL(href, window.location.origin);

        if (url.origin !== window.location.origin) {
          link.classList.remove("is-active");

          link.removeAttribute("aria-current");

          return;
        }

        linkPath = Utils.normalizePath(url.pathname);
      } catch {
        link.classList.remove("is-active");

        link.removeAttribute("aria-current");

        return;
      }

      const isCurrent = linkPath === currentPath;

      link.classList.toggle("is-active", isCurrent);

      if (isCurrent) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  },
};

/* ==========================================================================
   REVEAL ENGINE
   ========================================================================== */

const RevealController = {
  observer: null,
  reducedMotionQuery: null,

  config: Object.freeze({
    root: null,
    rootMargin: "0px 0px -8% 0px",
    threshold: 0.12,

    staggerStep: 80,
    maxStaggerDelay: 480,
  }),

  init() {
    const items = document.querySelectorAll("[data-reveal-item]");

    if (!items.length) return;

    this.reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (this.reducedMotionQuery.matches || !("IntersectionObserver" in window)) {
      this.showAll(items);
      return;
    }

    this.assignDelays(items);

    this.observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");

          observer.unobserve(entry.target);
        });
      },
      {
        root: this.config.root,
        rootMargin: this.config.rootMargin,
        threshold: this.config.threshold,
      },
    );

    items.forEach((item) => {
      this.observer.observe(item);
    });
  },

  showAll(items) {
    items.forEach((item) => {
      item.classList.add("is-visible");
    });
  },

  assignDelays(items) {
    const groups = new Map();

    items.forEach((item) => {
      const group = item.closest("[data-reveal-group]");

      if (!group) {
        item.style.setProperty("--reveal-delay", "0ms");

        return;
      }

      const groupItems = groups.get(group) ?? [];

      groupItems.push(item);
      groups.set(group, groupItems);
    });

    groups.forEach((groupItems) => {
      groupItems.forEach((item, index) => {
        const delay = Math.min(index * this.config.staggerStep, this.config.maxStaggerDelay);

        item.style.setProperty("--reveal-delay", `${delay}ms`);
      });
    });
  },
};

/* ==========================================================================
   FAQ
   ========================================================================== */

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
};

/* ==========================================================================
   NAVIGATION
   ========================================================================== */

const NavigationController = {
  init() {
    DOM.pageLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        const href = link.getAttribute("href");

        if (!href || href === "#") {
          return;
        }

        const targetId = href.slice(1);

        const target = document.getElementById(targetId);

        if (!target) return;

        event.preventDefault();

        if (MobileMenuController.isOpen) {
          MobileMenuController.close();
        }

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
        history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    });
  },
};

/* ==========================================================================
   CURRENT YEAR
   ========================================================================== */

const CurrentYearController = {
  init() {
    const year = new Date().getFullYear();

    document.querySelectorAll("[data-current-year]").forEach((element) => {
      element.textContent = `© ${year}`;
    });
  },
};

/* ==========================================================================
   APPLICATION
   ========================================================================== */

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

/* ==========================================================================
   BOOTSTRAP
   ========================================================================== */

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => App.init(), { once: true });
} else {
  App.init();
}
