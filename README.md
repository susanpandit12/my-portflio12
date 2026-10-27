# Susan Pandit — Portfolio

A personal portfolio with oversized editorial typography, warm orange accents, and a chrome Three.js sculpture that responds to the pointer and scroll position. The desktop homepage opens with a pinned hero, followed by a sage-green, three-chapter scroll story. Expertise stays alongside the scrolling service list, and the project card tilts gently as it enters view. IT Sathi appears as one small project link.

## Development

Use Node.js 22.12 or newer.

```sh
npm ci
npm run dev
```

## Production and verification

```sh
npm run build
npm run test:browser
```

The browser suite uses installed Microsoft Edge and serves the production build. It checks desktop/mobile layouts, keyboard navigation, the expertise accordion, real contact/project links, motion pause/resume, reduced-motion preferences, WebGL fallback, and automated accessibility rules. Local review screenshots are written to the ignored `artifacts/` directory. For other systems, change the Playwright browser channel or install Chromium.

Deploy the `dist` directory to a static host. No environment variables or backend are required. Contact buttons open the visitor’s email application.

## Editing

The interactive Tools section includes word/character counts, reading time, text case and spacing controls, JSON formatting/minification with validation, and a project brief builder. These utilities run locally in the browser. The brief builder opens a prepared email for the visitor to review and send; it does not submit a form to a backend.

- `src/App.jsx`: personal details, expertise, projects, social/contact links.
- `src/index.css`: responsive layout and visual design.
- `src/homepage.css`: homepage art direction, sticky scenes, and mobile/static layouts.
- `src/components/HomepageHero.jsx`: opening scene and scroll-linked typography/artwork.
- `src/components/ScrollStory.jsx`: scroll-driven Think / Build / Feel chapters.
- `src/components/Workbench.jsx` and `src/components/workbench.css`: interactive tools and project brief builder.
- `src/components/Sculpture.jsx`: lazy-loaded 3D scene, pointer motion, and resource cleanup.
- `public/assets/profile.jpg`: original portrait.
- `index.html`: title, search metadata, and social sharing metadata.

The 3D scene stops rendering while offscreen, when the tab is hidden, or when motion is paused. System reduced-motion preferences override animations. A CSS sculpture provides a fallback when WebGL is unavailable. Kanit and DM Sans are loaded from Google Fonts, with local system fallbacks.

Scrolling uses the browser's native scroll behavior. On mobile and short screens, all story chapters appear in normal vertical flow. Pausing motion or enabling reduced motion also exposes every chapter at once. The sticky navigation keeps the motion control available throughout the page.
