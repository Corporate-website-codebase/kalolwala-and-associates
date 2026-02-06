# Kalolwala & Associates - Digital Experience

A premium digital experience built for Kalolwala & Associates, featuring immersive animations, dynamic routing, and a highly polished UI.

## Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**:
  - [GSAP](https://greensock.com/gsap/) (ScrollTrigger, complex timelines)
  - [Framer Motion](https://www.framer.com/motion/) (Page transitions, UI interactions)
  - [Lenis](https://lenis.studiofreight.com/) (Smooth scrolling)
- **Language**: TypeScript 

## Key Features

### 1. Dynamic Offerings Routing
We utilize a clean, SEO-friendly routing structure for our service offerings.
- **Path**: `/offerings/[slug]`
- **Mechanism**: Dynamic mapping of "pretty URLs" to internal content keys.
- **Performance**: Fully statically generated (SSG) for instant load times.
- **Redirects**: Legacy query-param URLs (`?key=video`) automatically redirect to the new clean URLs via server-side configuration.

### 2. Immersive Animations
- **Stacked Curtain Transition**: Custom page transition effect found in `src/components/StackedCurtainTransition.tsx`.
- **Scroll-Driven Storytelling**: Heavy use of GSAP ScrollTrigger to pin sections and animate content on scroll (e.g., `Services.tsx`).

### 3. Component Architecture
- **`src/app`**: Next.js App Router structure.
- **`src/components`**: Reusable UI blocks.
- **`src/data`**: Centralized content management (e.g., `payloads.ts` for offering data).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deployment

