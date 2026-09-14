# Susan Pandit — Portfolio

A personal portfolio with oversized metallic typography, a pointer-responsive Three.js sculpture, expressive motion, and a responsive dark/light editorial layout. IT Sathi appears as one small project link.

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

- `src/App.jsx`: personal details, expertise, projects, social/contact links.
- `src/index.css`: responsive layout and visual design.
- `src/components/Sculpture.jsx`: lazy-loaded 3D scene, pointer motion, and resource cleanup.
- `public/assets/profile.jpg`: original portrait.
- `index.html`: title, search metadata, and social sharing metadata.

The 3D scene stops rendering while offscreen, when the tab is hidden, or when motion is paused. System reduced-motion preferences override animations. A CSS sculpture provides a fallback when WebGL is unavailable. Kanit and DM Sans are loaded from Google Fonts, with local system fallbacks.
