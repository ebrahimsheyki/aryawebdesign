# Arya Web Design — Multilingual Static Website

Static two-language website for Arya Web Design (X Web Design), implemented with semantic HTML, modern CSS, and vanilla JavaScript.

## Architecture

- Persian pages are under `/fa/`.
- English pages are under `/en/`.
- Each language has its own crawlable URL and real HTML content.
- CSS and JavaScript are shared between languages.
- Language switching uses real `<a href>` links rather than runtime text replacement.
- Each page has a self-referencing canonical URL and reciprocal `hreflang` annotations.
- `sitemap.xml` contains all 14 indexable localized URLs.
- Legacy `.html` URLs redirect to the Persian equivalents with HTTP 301 rules in `.htaccess`.

## Pages

Seven content pages are available in both languages: Home, Services, Process, Why Us, FAQ, Contact, and Java/Spring/Spring Boot Training.

## Deployment

The project is deployed to cPanel via GitHub Actions over FTPS.
