# X Web Design — Multilingual Static Website

Static multilingual website for X Web Design, built with semantic HTML, modern CSS, and vanilla JavaScript.

The site provides independently crawlable Persian and English pages with shared frontend behavior, responsive layouts, accessibility-focused interactions, and URL-based language switching.

## Architecture

- Persian pages are served under `/fa/`.
- English pages are served under `/en/`.
- Each language has its own static HTML document and crawlable URL.
- HTML owns localized content and page structure.
- CSS owns layout, responsive behavior, visual design, and animation.
- JavaScript provides progressive enhancement and shared UI behavior.
- Language switching uses normal `<a href>` links instead of runtime text replacement.
- No runtime `translations.js` layer is required for page content.
- Shared CSS and JavaScript are used across both languages.
- Each localized page uses a self-referencing canonical URL.
- Reciprocal `hreflang` annotations connect the Persian and English equivalents.
- `sitemap.xml` contains the indexable localized URLs.
- Legacy `.html` URLs are redirected through `.htaccess`.

## Frontend Stack

- HTML5
- CSS3
- Vanilla JavaScript (ES6+)
- Inter for Latin typography
- Vazirmatn for Persian typography
- Font Awesome for interface icons

## Pages

The website provides seven content areas in both Persian and English:

1. Home
2. Services
3. Process
4. Why Us
5. FAQ
6. Contact
7. Java, Spring & Spring Boot Training

Each language has its own page implementation under `/fa/` and `/en/`.

## Accessibility

The frontend follows accessibility-oriented practices, including:

- Semantic HTML and meaningful document structure
- Keyboard-operable interactive controls
- Visible `:focus-visible` states
- Focus management for the mobile navigation dialog
- `Escape` handling for the mobile navigation
- `inert` and ARIA state management for inactive dialog content
- Reduced-motion support with `prefers-reduced-motion`
- Logical heading hierarchy
- RTL/LTR support for Persian and English content

## Responsive Design

The interface is designed for:

- Mobile devices
- Tablets
- Desktop screens
- Large desktop displays

Responsive behavior is implemented with CSS media queries, intrinsic sizing, Grid, Flexbox, and logical properties for RTL/LTR compatibility.

## Project Structure

```text
aryawebdesign/
├── assets/
├── css/
│   └── style.css
├── en/
│   ├── index.html
│   ├── services/
│   ├── process/
│   ├── why-us/
│   ├── faq/
│   ├── contact/
│   └── training/
├── fa/
│   ├── index.html
│   ├── services/
│   ├── process/
│   ├── why-us/
│   ├── faq/
│   ├── contact/
│   └── training/
├── js/
│   └── app.js
├── .gitattributes
├── .gitignore
├── .prettierignore
├── .prettierrc.json
├── .htaccess
├── package.json
├── package-lock.json
├── robots.txt
├── sitemap.xml
└── README.md
```
