# ES TECH — Digital Solutions & Software Development

A modern, responsive, multilingual website for **ES TECH**, a software development and digital solutions company.

The website is designed to present software engineering, web development, digital solutions, and technology services through a professional SaaS-inspired interface.

---

## Overview

ES TECH is a modern company website built with a strong focus on:

* Professional UI/UX
* Mobile-first responsive design
* Performance
* Accessibility
* SEO
* Multilingual support
* Dark theme
* Clean and maintainable frontend architecture
* Progressive enhancement
* Modern CSS and JavaScript practices

The website supports both **Persian (FA)** and **English (EN)** languages and automatically adapts its text direction between **RTL** and **LTR**.

---

## Features

### Core Features

* Responsive design for mobile, tablet, and desktop
* Persian and English language support
* RTL / LTR direction switching
* Dark theme
* Sticky navigation header
* Mobile navigation drawer
* Scroll progress indicator
* Back-to-top button
* Smooth scrolling
* Animated hero section
* Marquee / scrolling content
* Reveal-on-scroll animations
* FAQ accordion
* Interactive CTA sections
* Contact section
* Professional footer

### Accessibility

The interface follows accessibility-oriented frontend practices, including:

* Semantic HTML
* Keyboard navigation
* Visible focus states
* Accessible interactive elements
* Appropriate ARIA attributes where required
* Reduced-motion support
* Meaningful labels and descriptions
* Logical heading hierarchy

### SEO

The website includes SEO-oriented implementation such as:

* Semantic HTML structure
* Descriptive page title
* Meta description
* Canonical URL
* Open Graph metadata
* Twitter metadata
* Language and direction attributes
* Search-engine-friendly content structure
* Persian-focused content and keywords

---

## Technology Stack

### Frontend

* HTML5
* CSS3
* Modern JavaScript (ES6+)

### Fonts

* Vazirmatn — Persian typography
* Inter — Latin / English typography

### Development Tools

* Visual Studio Code
* Git
* GitHub

### Deployment

The project is designed to be deployed as a static website and can be hosted using services such as Cloudflare Pages.

---

## Project Structure

```text
ES-TECH/
│
├── index.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── app.js
│   └── translations.js
│
│
├── README.md
└── ...
```

---

## Website Sections

The website is organized into the following primary sections:

1. Header
2. Hero
3. Hero Surface
4. Trust / Trust Pillars
5. Services
6. Featured Solutions
7. Process
8. Why ES TECH
9. FAQ
10. CTA Banner
11. Contact
12. Footer

Each section is designed to have a clear semantic purpose and consistent visual language.

---

## Responsive Design

The website follows a **mobile-first responsive design strategy**.

The layout is optimized for:

* Mobile phones
* Tablets
* Laptops
* Desktop monitors
* Large desktop displays

Responsive behavior includes adaptive:

* Navigation
* Typography
* Spacing
* Grid layouts
* Cards
* Buttons
* Hero content
* Footer
* Interactive components

The goal is to maintain usability and visual consistency across different viewport sizes.

---

## Multilingual Architecture

The website supports:

* Persian (`fa`)
* English (`en`)

The active language controls:

* Page language
* Text content
* Text direction
* Translated UI labels
* Navigation content
* Hero content
* Section content

Persian uses:

```html
<html lang="fa" dir="rtl">
```

English uses:

```html
<html lang="en" dir="ltr">
```

Translations are managed through the JavaScript translation system.

---

## Theme

The website uses a modern dark visual system.

Design values are centralized through CSS custom properties / design tokens, including:

* Colors
* Typography
* Spacing
* Border radius
* Shadows
* Transitions
* Focus states

This approach makes the visual system easier to maintain and extend.

---

## CSS Architecture

The stylesheet is organized around reusable design principles rather than page-specific styling whenever possible.

The architecture includes:

* Design tokens
* Base styles
* Typography
* Layout utilities
* Header system
* Navigation system
* Button system
* Card components
* Section layouts
* Animation system
* Responsive breakpoints
* Accessibility states
* Reduced-motion handling

CSS custom properties are used to reduce duplication and maintain consistency across the UI.

---

## JavaScript Architecture

JavaScript is responsible for interactive behavior while keeping the HTML structure semantic and the CSS responsible for presentation.

Major responsibilities include:

* Language switching
* Translation rendering
* Mobile navigation
* Theme-related interactions
* Scroll progress
* Back-to-top behavior
* FAQ interaction
* Reveal animations
* UI state management

The implementation aims to avoid unnecessary dependencies and keep the frontend lightweight.

---

## Performance

Performance is considered throughout the project.

The implementation focuses on:

* Minimal dependencies
* Lightweight JavaScript
* Efficient CSS
* Semantic HTML
* Reduced unnecessary DOM manipulation
* CSS-based animations where appropriate
* Respecting `prefers-reduced-motion`
* Avoiding unnecessary third-party libraries

---

## Reduced Motion

The website respects users who prefer reduced motion.

Animations and transitions are reduced or disabled when the browser reports:

```css
@media (prefers-reduced-motion: reduce)
```

This improves accessibility and provides a more comfortable experience for motion-sensitive users.

---

## Local Development

This is a static frontend project and does not require a backend server for basic development.

### 1. Clone the repository

```bash
git clone <repository-url>
```

### 2. Open the project

```bash
cd ES-TECH
```

### 3. Run locally

The project can be opened directly through `index.html`.

For a better development experience, use a local development server such as **VS Code Live Server**.

---

## Deployment

The website is suitable for static hosting.

A production deployment can be performed through:

* GitHub
* Cloudflare Pages
* Other static hosting providers

The recommended deployment flow is:

```text
Local Development
       ↓
Git
       ↓
GitHub Repository
       ↓
Cloudflare Pages
       ↓
Production Website
```

---

## Browser Support

The website targets modern browsers with support for current versions of:

* Google Chrome
* Microsoft Edge
* Mozilla Firefox
* Safari
* Mobile Chrome
* Mobile Safari

Older browsers may not support all modern CSS and JavaScript features.

---

## Quality Checklist

Before releasing a production version, verify the following.

### HTML

* [ ] Valid semantic HTML
* [ ] Correct heading hierarchy
* [ ] Correct `lang` attribute
* [ ] Correct `dir` attribute
* [ ] Accessible form labels
* [ ] No duplicate IDs
* [ ] No unnecessary ARIA attributes

### CSS

* [ ] Responsive at all target breakpoints
* [ ] No horizontal overflow
* [ ] Consistent spacing
* [ ] Consistent design tokens
* [ ] No unnecessary duplicated rules
* [ ] Reduced-motion support
* [ ] Visible keyboard focus states

### JavaScript

* [ ] No console errors
* [ ] No unnecessary event listeners
* [ ] No memory leaks
* [ ] Mobile navigation works correctly
* [ ] Language switching works correctly
* [ ] FAQ works correctly
* [ ] Scroll progress works correctly
* [ ] Back-to-top works correctly

### SEO

* [ ] Correct title
* [ ] Correct meta description
* [ ] Canonical URL
* [ ] Open Graph metadata
* [ ] Twitter metadata
* [ ] Semantic content
* [ ] Proper heading structure
* [ ] Search-friendly Persian content

### Responsive Testing

Test at minimum:

* [ ] Small mobile
* [ ] Large mobile
* [ ] Tablet
* [ ] Laptop
* [ ] Desktop
* [ ] Large desktop

---

## Project Status

**Status:** In Development

The project is intended to serve as the official ES TECH company website and is continuously maintained and improved.

---

## License

Copyright © 2026 ES TECH.

All rights reserved.

The source code, design, branding, graphics and content are proprietary to ES TECH unless explicitly stated otherwise.

Unauthorized copying, redistribution, modification, or commercial use is not permitted without prior permission.

---

## Author

**ES TECH**

Software Development & Digital Solutions

---

## Contact

For business inquiries, software development services, web development, and digital solutions, please use the contact information provided on the official ES TECH website.
