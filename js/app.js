"use strict";

/* =========================================================
 * Arya Web Design
 * Production Main JavaScript
 * Architecture:
 * Config
 * DOM Cache
 * Storage
 * Utilities
 * Controllers
 * App
 * ========================================================= */

/* =========================================================
 * CONFIG
 * ========================================================= */
const CONFIG = Object.freeze({
  headerScrolled: 16,
  revealThreshold: 0.15,
  backToTopOffset: 320,
  scrollTargetOffset: 8,

  storage: Object.freeze({
    theme: "arya.theme",
    language: "arya.language",
  }),

  breakpoints: Object.freeze({
    desktop: 1024,
  }),
});

/* =========================================================
 * DOM CACHE
 * ========================================================= */

const DOM = Object.freeze({
  html: document.documentElement,
  body: document.body,
  header: document.getElementById("mainHeader"),
  progressBar: document.getElementById("progressBar"),
  navItems: document.querySelectorAll(".desktop-nav-link"),
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
  pageLinks: document.querySelectorAll('a[href^="#"]:not(#backToTop)'),
  ariaElements: document.querySelectorAll("[data-lang-aria]"),
  sections: document.querySelectorAll("#services, #process, #why-us, #contact"),

  mobileMenuLinks: document.querySelectorAll("#mobileMenu a"),

  langElements: document.querySelectorAll("[data-lang-key]"),
});

/* ============================================
 * STORAGE
 * ============================================ */
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
      // Storage may be unavailable in private/restricted contexts.
    }
  },
});

const I18nValidator = Object.freeze({
  validate() {
    const elements = document.querySelectorAll("[data-lang-key]");

    for (const language of Object.keys(TRANSLATIONS)) {
      const translations = TRANSLATIONS[language];

      for (const element of elements) {
        const key = element.dataset.langKey;

        if (!(key in translations)) {
          console.warn(`[i18n] Missing key: ${language}.${key}`);
        }
      }

      if (
        typeof translations.heroDescriptionDesktop !== "string" ||
        !translations.heroDescriptionDesktop.trim()
      ) {
        console.warn(`[i18n] Missing key: ${language}.heroDescriptionDesktop`);
      }

      if (
        !Array.isArray(translations.heroDescription) ||
        translations.heroDescription.length === 0 ||
        translations.heroDescription.some(
          (sentence) => typeof sentence !== "string" || !sentence.trim(),
        )
      ) {
        console.warn(`[i18n] Invalid key: ${language}.heroDescription`);
      }
    }
  },
});
/* =========================================================
 * UTILITIES
 * ========================================================= */

const Utils = Object.freeze({
  prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  },

  getHeaderHeight() {
    return DOM.header?.getBoundingClientRect().height ?? 0;
  },

  scrollTo(target) {
    if (!target) return;

    const headerHeight = this.getHeaderHeight();

    const targetTop =
      window.scrollY +
      target.getBoundingClientRect().top -
      headerHeight -
      CONFIG.scrollTargetOffset;

    window.scrollTo({
      top: Math.max(0, targetTop),
      left: 0,
      behavior: this.prefersReducedMotion() ? "auto" : "smooth",
    });
  },

  scrollToTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: this.prefersReducedMotion() ? "auto" : "smooth",
    });
  },
});

/* =========================================================
 * THEME CONTROLLER
 * ========================================================= */

const ThemeController = {
  init() {
    const savedTheme = Storage.get(CONFIG.storage.theme, "dark");

    const theme = savedTheme === "light" ? "light" : "dark";

    this.apply(theme);

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

      if (icon) {
        icon.className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";
      }

      button.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode",
      );
    });
  },
};

/* =========================================================
 * LANGUAGE CONTROLLER
 * ========================================================= */

const LanguageController = {
  initialized: false,

  init() {
    if (this.initialized) {
      return;
    }

    this.initialized = true;

    const savedLanguage = Storage.get(CONFIG.storage.language, "fa");

    const language = savedLanguage === "en" ? "en" : "fa";

    this.apply(language);

    DOM.languageToggles.forEach((button) => {
      button.addEventListener("click", () => {
        this.toggle();
      });
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

    HeroDescriptionController.update(normalizedLanguage);

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

    if (!translations) {
      console.error(`[i18n] Translation dictionary not found: ${language}`);

      return;
    }

    DOM.langElements.forEach((element) => {
      const key = element.dataset.langKey;

      if (!key) {
        return;
      }

      /*
       * Hero description is controlled
       * independently because it is animated.
       */
      if (key === "heroDescription") {
        return;
      }

      const value = translations[key];

      if (value === undefined) {
        console.warn(`[i18n] Missing translation: ${language}.${key}`);

        return;
      }

      element.textContent = value;
    });
  },
};

/* =========================================================
 * HERO DESCRIPTION CONTROLLER
 *
 * Mobile:
 * Character scramble -> resolve
 *
 * Desktop:
 * Static text
 * ========================================================= */

/* =========================================================
 * HERO DESCRIPTION CONTROLLER
 *
 * Desktop:
 *   Static company description
 *
 * Mobile:
 *   Character scramble / resolve
 * ========================================================= */

const HeroDescriptionController = {
  initialized: false,

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
    if (this.initialized) {
      return;
    }

    this.element = document.querySelector(".hero-description");

    if (!this.element) {
      return;
    }

    this.textElement = this.element.querySelector(".hero-description-text");

    if (!this.textElement) {
      console.warn("[HeroDescription] .hero-description-text not found.");

      return;
    }

    this.mediaQuery = window.matchMedia(
      `(max-width: ${this.config.mobileBreakpoint}px)`,
    );

    this.reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    this.mediaQuery.addEventListener("change", this.handleMediaChange);

    this.reducedMotionQuery.addEventListener("change", this.handleMediaChange);

    document.addEventListener("visibilitychange", this.handleVisibilityChange);

    this.initialized = true;
  },

  update(language) {
    if (!this.initialized) {
      return;
    }

    this.stop();

    const translations = TRANSLATIONS[language];

    if (!translations) {
      console.error(`[HeroDescription] Missing language: ${language}`);

      return;
    }

    /*
     * Desktop description
     */
    const desktopDescription = translations.heroDescriptionDesktop;

    if (
      typeof desktopDescription !== "string" ||
      desktopDescription.trim() === ""
    ) {
      console.error(
        `[HeroDescription] Missing heroDescriptionDesktop: ${language}`,
      );

      return;
    }

    /*
     * Mobile descriptions
     */
    const sentences = translations.heroDescription;

    if (
      !Array.isArray(sentences) ||
      sentences.length === 0 ||
      sentences.some(
        (sentence) => typeof sentence !== "string" || sentence.trim() === "",
      )
    ) {
      console.error(
        `[HeroDescription] Invalid heroDescription array: ${language}`,
      );

      return;
    }

    this.desktopDescription = desktopDescription;

    this.sentences = sentences;
    this.currentIndex = 0;

    /*
     * Desktop OR reduced motion:
     * Always show the real company description.
     */
    if (!this.isAnimated()) {
      this.renderDesktop();

      return;
    }

    /*
     * Mobile:
     * Start the scramble sequence.
     */
    this.play();
  },

  play() {
    if (!this.isAnimated()) {
      this.renderDesktop();
      return;
    }

    const target = this.sentences[this.currentIndex];

    if (!target) {
      return;
    }

    this.animate(target);
  },

  animate(target) {
    this.cancelAnimation();

    /*
     * This class is important.
     *
     * It activates nowrap ONLY while
     * scramble is running.
     */
    this.element.classList.add("is-scrambling");

    const characters = Array.from(target);
    const startTime = performance.now();

    const frame = (now) => {
      /*
       * If we are no longer in mobile mode,
       * immediately switch to desktop content.
       */
      if (!this.isAnimated()) {
        this.renderDesktop();
        return;
      }

      const elapsed = now - startTime;

      const progress = Math.min(elapsed / this.config.scrambleDuration, 1);

      const eased = 1 - Math.pow(1 - progress, 3);

      /*
       * Resolve progressively from left to right.
       */
      const resolvePoint = eased * characters.length;

      const output = characters.map((character, index) => {
        /*
         * Spaces and punctuation
         * never scramble.
         */
        if (this.isStaticCharacter(character)) {
          return character;
        }

        /*
         * Resolved character.
         */
        if (index < resolvePoint) {
          return character;
        }

        /*
         * Still scrambling.
         */
        return this.randomCharacter(character);
      });

      this.render(output.join(""));

      if (progress < 1) {
        this.animationFrameId = requestAnimationFrame(frame);

        return;
      }

      /*
       * Guarantee the exact final sentence.
       */
      this.render(target);

      this.animationFrameId = null;

      /*
       * Allow normal wrapping again.
       */
      this.element.classList.remove("is-scrambling");

      this.timeoutId = window.setTimeout(() => {
        this.next();
      }, this.config.holdDuration);
    };

    this.animationFrameId = requestAnimationFrame(frame);
  },

  next() {
    if (!this.isAnimated() || document.hidden || this.sentences.length <= 1) {
      return;
    }

    this.currentIndex = (this.currentIndex + 1) % this.sentences.length;

    this.play();
  },

  render(value) {
    if (!this.textElement) {
      return;
    }

    this.textElement.textContent = value;
  },

  renderDesktop() {
    this.element.classList.remove("is-scrambling");

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

    /*
     * Never leave the scramble state active.
     */
    this.element?.classList.remove("is-scrambling");
  },

  handleMediaChange: () => {
    const controller = HeroDescriptionController;

    controller.stop();

    if (!controller.desktopDescription && !controller.sentences.length) {
      return;
    }

    /*
     * Desktop
     */
    if (!controller.isAnimated()) {
      controller.renderDesktop();
      return;
    }

    /*
     * Mobile
     */
    controller.play();
  },

  handleVisibilityChange: () => {
    const controller = HeroDescriptionController;

    if (document.hidden) {
      controller.stop();
      return;
    }

    if (controller.isAnimated()) {
      controller.play();
    } else {
      controller.renderDesktop();
    }
  },

  destroy() {
    this.stop();

    this.mediaQuery?.removeEventListener("change", this.handleMediaChange);

    this.reducedMotionQuery?.removeEventListener(
      "change",
      this.handleMediaChange,
    );

    document.removeEventListener(
      "visibilitychange",
      this.handleVisibilityChange,
    );

    this.initialized = false;

    this.element = null;
    this.textElement = null;
    this.mediaQuery = null;
    this.reducedMotionQuery = null;

    this.desktopDescription = "";
    this.sentences = [];
  },
};

/* =========================================================
 * MOBILE CONTROLLER
 * ========================================================= */
const MobileMenuController = {
  initialized: false,
  isOpen: false,
  previousFocus: null,

  init() {
    if (this.initialized) return;

    this.initialized = true;

    if (DOM.mobileMenu && "inert" in DOM.mobileMenu) {
      DOM.mobileMenu.inert = true;
    }

    DOM.menuToggle?.addEventListener("click", () => this.toggle());

    DOM.mobileMenuClose?.addEventListener("click", () => this.close());

    DOM.mobileMenuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        this.close();
      });
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
        if (window.innerWidth >= CONFIG.breakpoints.desktop && this.isOpen) {
          this.close();
        }
      },
      { passive: true },
    );
  },

  toggle() {
    if (this.isOpen) {
      this.close();
      return;
    }

    this.open();
  },

  open() {
    if (this.isOpen || !DOM.mobileMenu || !DOM.body) {
      return;
    }

    this.previousFocus = document.activeElement;

    this.isOpen = true;

    DOM.body.classList.add("menu-open");
    DOM.menuToggle?.setAttribute("aria-expanded", "true");
    DOM.mobileMenu.setAttribute("aria-hidden", "false");

    if ("inert" in DOM.mobileMenu) {
      DOM.mobileMenu.inert = false;
    }

    requestAnimationFrame(() => {
      DOM.mobileMenuClose?.focus();
    });
  },

  close() {
    if (!this.isOpen) return;

    this.isOpen = false;

    DOM.body.classList.remove("menu-open");
    DOM.mobileMenu?.setAttribute("aria-hidden", "true");

    if (DOM.mobileMenu && "inert" in DOM.mobileMenu) {
      DOM.mobileMenu.inert = true;
    }

    DOM.menuToggle?.setAttribute("aria-expanded", "false");

    const focusTarget =
      this.previousFocus instanceof HTMLElement &&
      document.contains(this.previousFocus)
        ? this.previousFocus
        : DOM.menuToggle;

    focusTarget?.focus();

    this.previousFocus = null;
  },

  getFocusableElements() {
    if (!DOM.mobileMenu) {
      return [];
    }

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
    if (!this.isOpen || event.key !== "Tab") {
      return;
    }

    const focusable = this.getFocusableElements();

    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
      return;
    }

    if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  },
};

/* =========================================================
 * SCROLL CONTROLLER
 * ========================================================= */

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

    const progress = Math.min(
      Math.max(window.scrollY / scrollableHeight, 0),
      1,
    );

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
    if (!DOM.navItems.length || !DOM.sections.length) {
      return;
    }

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

    DOM.mobileMenuLinks.forEach((link) => {
      link.classList.toggle(
        "is-active",
        link.getAttribute("href") === `#${current}`,
      );
    });
  },
};

/* =========================================================
 * REVEAL CONTROLLER
 * ========================================================= */

const RevealController = {
  observer: null,

  init() {
    if (!DOM.revealItems.length) {
      return;
    }

    if (Utils.prefersReducedMotion()) {
      DOM.revealItems.forEach((item) => {
        item.classList.add("is-visible");
      });

      return;
    }

    if (!("IntersectionObserver" in window)) {
      DOM.revealItems.forEach((item) => {
        item.classList.add("is-visible");
      });

      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");

          this.observer?.unobserve(entry.target);
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
};

/* ===================================================
 * FAQ CONTROLLER
 * =================================================== */
const FAQController = {
  init() {
    if (!DOM.faqItems.length) {
      return;
    }

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
/* =========================================================
 * NAVIGATION CONTROLLER
 * ========================================================= */

const NavigationController = {
  init() {
    DOM.pageLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        const href = link.getAttribute("href");

        if (!href || !href.startsWith("#") || href === "#") {
          return;
        }

        const targetId = href.slice(1);

        const target = document.getElementById(targetId);

        if (!target) {
          return;
        }

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
        history.replaceState(
          null,
          "",
          window.location.pathname + window.location.search,
        );
      }
    });
  },
};

/* =========================================================
 * CURRENT YEAR CONTROLLER
 * ========================================================= */
const CurrentYearController = {
  init() {
    const year = String(new Date().getFullYear());

    document.querySelectorAll("[data-current-year]").forEach((element) => {
      element.textContent = `© ${year}`;
    });
  },
};
/* =========================================================
 * APP
 * ========================================================= */

const App = {
  initialized: false,

  init() {
    if (this.initialized) {
      return;
    }
    this.initialized = true;
    ThemeController.init();
    HeroDescriptionController.init();
    LanguageController.init();
    I18nValidator.validate();
    MobileMenuController.init();
    ScrollController.init();
    RevealController.init();
    FAQController.init();
    NavigationController.init();
    CurrentYearController.init();
  },
};

/* =========================================================
 * BOOTSTRAP
 * ========================================================= */
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => App.init(), {
    once: true,
  });
} else {
  App.init();
}
