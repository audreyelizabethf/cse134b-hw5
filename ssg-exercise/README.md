# SSG Exercise (Eleventy)

Two pages from my portfolio, **About** and **Ceramics**, built with Eleventy.
Both pages use one shared footer in `_includes/footer.njk`.

## Install dependencies
    cd ssg-exercise
    npm install

## Build
    npm run build

Output goes to `_site/`.

## Preview
    npm start

Then open:
- http://localhost:8080/about.html
- http://localhost:8080/ceramics.html

## Shared section
Edit `_includes/footer.njk` once, rebuild (or save while `npm start` is running),
and both pages show the change.