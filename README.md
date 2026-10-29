# Akash Kumar Gouda — Portfolio

Personal portfolio built with **React (Vite)**, **Bootstrap 5** and **Bootstrap Icons**, with a sky-blue theme.

## Run it

```bash
npm install
npm run dev      # start dev server at http://localhost:5173
npm run build    # production build into /dist
npm run preview  # preview the production build
```

## Folder structure

```
src/
├── data/              ← all page content lives here (edit these, not the JSX)
│   ├── site.json        navbar links, brand, footer, email
│   ├── home.json        hero, roles, stats, tech stack, services
│   ├── about.json       bio, info, skills, tools, experience
│   ├── portfolio.json   filter categories + projects
│   ├── designs.json     design gallery (posters, banners, newsletters…)
│   └── contact.json     email, mail subjects, contact cards
├── hooks/useData.js   ← loads any JSON from /data: useData("home")
├── components/        Navbar, Footer, PageHeader, Loader, Typewriter, Reveal
├── pages/             Home, About, Portfolio, Designs, Contact, NotFound
├── App.jsx            routes
├── main.jsx           entry
└── index.css          sky-blue theme
```

## Updating content

- **Add your designs (Designs page):**
  1. Put the image in `public/designs/` (JPG, PNG, WebP or SVG), e.g. `public/designs/diwali-poster.jpg`.
  2. Add an entry to `designs` in `src/data/designs.json`:
     ```json
     { "id": 9, "title": "Diwali Sale Poster", "category": "Poster", "image": "/designs/diwali-poster.jpg", "tool": "Photoshop", "client": "Singer" }
     ```
  3. `category` must match one of the `categories` in the same file. Add a new category (e.g. `"Logo"`) there to get a new filter button.
  4. Delete the sample `poster-1.svg`, `banner-1.svg`… files and their entries once you've added your own.
  Tip: export images around 1200–1600px wide and compress them (e.g. TinyPNG) so the gallery loads fast.

- **Add a project:** add an object to `projects` in `src/data/portfolio.json` (`accent` is the cover colour, `icon` is any Bootstrap Icons class).
- **Change skills:** edit `skills` in `src/data/about.json` (`level` is 0–100).
- **Contact:** there's no form — every button opens the visitor's mail app (`mailto:`) with a pre-filled subject, set in `contact.json`.
- **Theme colours:** change the `--sky-*` variables at the top of `src/index.css`.

## Deploying

For Netlify / Vercel, the build command is `npm run build` and the output folder is `dist`.
Because the site uses React Router, add a rewrite so refreshing `/about` works:
- Netlify: `public/_redirects` is already included.
- Vercel: `vercel.json` is already included.
