# Loading Page - Page Transition Demo

A Next.js 16 project demonstrating smooth page transitions with a custom loader component, ported from the giats-portfolio project.

## 📋 Project Overview

This project showcases a sophisticated page transition system featuring:
- Initial loading animation with progress counter (0% → 100%)
- Smooth page-to-page transitions
- GSAP-powered animations
- Lenis smooth scrolling integration

## 🛠️ Tech Stack

- **Framework**: Next.js 16.1.1
- **Core**: React 19.2.3
- **Package Manager**: pnpm
- **Animation Libraries**:
  - GSAP ^3.12.5 - Core animation engine
  - React Transition Group ^4.4.5 - Page transition management
  - Split Type ^0.3.4 - Text splitting for animations
  - Lenis ^1.1.6 - Smooth scrolling
- **State Management**: Zustand ^4.5.4
- **Styling**: SCSS modules + Tailwind CSS
- **Language**: TypeScript

## 🎯 Features

### Initial Loader Animation
- 5-second progress animation (0% → 100%)
- Animated text transitions with split-type effects
- Smooth scale and position transformations

### Page Transitions
- **Exit Animation** (~2.55s):
  - Header fade out
  - Content scales down and slides left
  - Loader slides in from right

- **Enter Animation** (~4.5s):
  - Loader slides out left
  - New content slides in from right
  - Content scales up to full size
  - Header fades in

### Demo Pages
- **Home**: White background with "Home" title and navigation button to About Me
- **About Me**: White background with "About Me" title and navigation button to Home

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
pnpm install
```

### Development

```bash
# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

The development server will start with:
- Hot reload enabled
- Initial loader animation on first load
- Smooth transitions between Home and About Me pages

### Build

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## 📁 Project Structure

```
loading-page/
├── app/
│   ├── about/
│   │   └── page.tsx          # About Me page
│   ├── page.tsx               # Home page
│   ├── layout.tsx             # Root layout with metadata
│   └── globals.css            # Global styles
├── components/
│   ├── ClientLayout.tsx       # Client-side layout wrapper with Lenis
│   ├── Loader.tsx             # Initial page loader component
│   ├── Layout.tsx             # Page transition controller
│   ├── loader.module.scss     # Loader styles
│   └── layout.module.scss     # Layout styles
├── hooks/
│   └── useIsomorphicLayoutEffect.ts  # SSR-safe layout effect
├── lib/
│   └── store.ts               # Zustand state management
└── package.json
```

## 🎨 Animation Details

### Timeline Breakdown

**Initial Load (Loader.tsx)**:
1. Progress counter animates to 100% (5s)
2. Full name slides up and out (1s)
3. Welcome text slides in (1s)
4. Layout scales down to 90% (0.5s, delay 0.8s)
5. Loader slides left, content slides in (0.5s, delay 1.7s)
6. Content scales to 100% (0.5s, delay 2.2s)
7. Header fades in (0.5s, delay 2.3s)
8. Animation complete (delay 2.7s)

**Page Exit (Layout.tsx)**:
- Header fades out (0.5s)
- Content scales to 90% with border (0.5s)
- Content slides left, loader slides in (0.5s)

**Page Enter (Layout.tsx)**:
- Loader slides left (instant)
- Content slides in from right (instant)
- Content scales to 100% (0.5s)
- Header fades in (0.5s)

## 🔧 Configuration

### Lenis Smooth Scroll Settings
```typescript
{
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
}
```

### Transition Timeouts
- Enter: 4500ms (only after intro completes)
- Exit: 2550ms

## 📝 Notes

- This is a minimal implementation focusing solely on the page transition loader
- 3D effects, menu animations, and other features from the original portfolio were intentionally excluded
- The project is isolated and does not affect other projects in the workspace
- All animations use GSAP with `power2.inOut` and `power4.inOut` easing

## 🎓 Learning Points

This project demonstrates:
- Complex GSAP timeline orchestration
- React Transition Group integration with Next.js App Router
- Zustand for lightweight state management
- SSR-safe animation setup with useIsomorphicLayoutEffect
- TypeScript with Next.js 16 and React 19
- SCSS modules alongside Tailwind CSS

## 📄 License

This is a demo project ported from giats-portfolio for educational purposes.
