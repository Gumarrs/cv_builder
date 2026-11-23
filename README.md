# CVForge

A frontend-only CV builder built with Next.js, TypeScript, Tailwind CSS, Zustand, and `@react-pdf/renderer`.

## Features

- No login, backend, or database.
- Three templates: ATS Classic, ATS Modern, and Creative.
- Live CV preview with desktop split-view and mobile edit/preview tabs.
- Dynamic education, work experience, organization, project, and reference entries.
- Skills input using comma-separated values.
- Template switching without replacing CV content.
- Local browser autosave with a versioned storage key.
- A4 PDF export with selectable text.
- Indonesian and English interface labels in the builder.
- Profile photo upload for the Creative preview.

## Requirements

- Node.js 20.9 or newer
- npm

## Installation

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production

```bash
npm run typecheck
npm run build
npm run start
```

## Storage and privacy

CV data is saved in the current browser using `localStorage` under `cv-builder:v1`. Data is not sent to an application backend. Clearing browser data or switching devices can remove or make the saved CV unavailable. Profile photos are stored as data URLs; use reasonably sized images.

## Add a template

1. Add the new template ID and metadata to `src/templates/registry.ts`.
2. Add its preview styling in `src/app/globals.css` and rendering rules in `src/components/CVPreview.tsx`.
3. If the template requires a distinct PDF layout, add a corresponding document component in `src/components/PDFRenderer.tsx`.
4. Keep the shared `CVData` structure in `src/types/cv.ts` unchanged unless a genuinely new data field is required.

## Notes

This is an MVP foundation. The builder supports the core data-entry and export flow; advanced features such as drag-and-drop ordering, photo cropping, detailed per-template PDF styling, and robust multi-page visual parity can be added in subsequent iterations. The Creative layout is currently represented in the live HTML preview; the PDF renderer uses a clean text-first layout for reliable selectable text.
