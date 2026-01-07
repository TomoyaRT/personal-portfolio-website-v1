# CursorPage - WebGL Fluid Cursor Effects

A Next.js 16 project featuring precise WebGL fluid simulation cursor effects migrated from the giats-portfolio project.

## 🎯 Project Purpose

This project demonstrates a standalone implementation of advanced cursor-following dynamic effects using WebGL fluid simulation. The visual effects create a flowing, interactive experience that responds to mouse movement with realistic fluid dynamics.

## 🚀 Tech Stack

### Core Framework
- **Next.js**: 16.1.1 (Latest Stable)
- **React**: 19.2.3 (Latest Stable)
- **TypeScript**: 5.9.3

### 3D Graphics & Animation
- **Three.js**: 0.182.0 - WebGL rendering library
- **@react-three/fiber**: 9.5.0 - React renderer for Three.js
- **@react-three/drei**: 10.7.7 - Helper utilities for React Three Fiber
- **@react-three/postprocessing**: 3.0.4 - Post-processing effects
- **postprocessing**: 6.38.2 - Post-processing library

### Build Tools
- **pnpm**: Package manager
- **Turbopack**: Next.js 16 default bundler with custom shader loader configuration

## 📁 Project Structure

```
cursor-page/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page with fluid effects
│   └── globals.css         # Global styles
├── components/
│   └── canvas/
│       └── fluid/
│           ├── Fluid.tsx                    # Main fluid simulation component
│           ├── utils.ts                     # Color conversion utilities
│           ├── effect/
│           │   ├── Fluid.tsx               # Fluid effect wrapper
│           │   └── FluidEffect.tsx         # Custom postprocessing effect
│           ├── hooks/
│           │   ├── usePointerEvents.tsx    # Mouse tracking hook
│           │   ├── useOpts.tsx             # Fluid configuration options
│           │   ├── useMaterials.tsx        # Shader materials manager
│           │   ├── useFBOs.tsx             # Frame buffer objects
│           │   └── useDoubleFBO.tsx        # Double buffering utility
│           └── glsl/                       # GLSL Shaders
│               ├── base.vert               # Base vertex shader
│               ├── splat.frag              # Cursor splat effect
│               ├── advection.frag          # Fluid advection
│               ├── curl.frag               # Vorticity calculation
│               ├── vorticity.frag          # Vorticity confinement
│               ├── divergence.frag         # Divergence calculation
│               ├── pressure.frag           # Pressure solver
│               ├── gradientSubstract.frag  # Pressure gradient
│               ├── clear.frag              # Buffer clearing
│               └── post.frag               # Final composition
├── hooks/
│   └── useIsomorphicLayoutEffect.ts        # SSR-safe layout effect
├── types/
│   └── shaders.d.ts                        # TypeScript declarations for shaders
├── next.config.js                          # Next.js configuration with Turbopack
├── tsconfig.json                           # TypeScript configuration
└── package.json                            # Dependencies and scripts
```

## 🎨 Fluid Simulation Features

### WebGL-Based Fluid Dynamics
- Real-time Navier-Stokes fluid simulation
- Vorticity confinement for realistic swirling effects
- Pressure solver for incompressible fluid behavior
- Velocity and density advection
- Configurable dissipation rates

### Cursor Interaction
- Mouse/touch tracking with velocity calculation
- Gaussian splat distribution for smooth effects
- Force-based interaction system
- Mobile-optimized parameters

### Visual Effects
- Mix blend mode: difference for striking visual impact
- Customizable fluid color (#f0f4f1 default)
- Adjustable intensity and radius
- Background color integration

## 🛠️ Execution Guide

### Development Mode

Start the development server:

```bash
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### Build for Production

Create an optimized production build:

```bash
pnpm build
```

### Start Production Server

After building, start the production server:

```bash
pnpm start
```

### Linting

Run ESLint to check code quality:

```bash
pnpm lint
```

## ⚙️ Configuration

### Fluid Parameters (useOpts.tsx)

The fluid simulation can be customized through the following parameters:

```typescript
{
  intensity: 5,              // Effect intensity multiplier
  force: 1,                  // Mouse interaction force
  curl: 1,                   // Vorticity strength
  radius: 0.14,              // Splat radius (0.11 on mobile)
  swirl: 3,                  // Pressure iteration count

  pressure: 0.0,             // Initial pressure value
  densityDissipation: 0.965, // Density fade rate (0.96 on mobile)
  velocityDissipation: 0.93, // Velocity dampening

  fluidColor: '#f0f4f1',     // Fluid color
  backgroundColor: '#070410', // Background color

  dyeRes: 256,               // Density resolution (64 on mobile)
  simRes: 50,                // Simulation resolution (16 on mobile)
}
```

### Turbopack Configuration

The project uses Turbopack (Next.js 16 default) with custom loaders for GLSL shader files:

```javascript
turbopack: {
  rules: {
    '*.vert': { loaders: ['raw-loader'], as: '*.js' },
    '*.frag': { loaders: ['raw-loader'], as: '*.js' },
    '*.glsl': { loaders: ['raw-loader'], as: '*.js' },
  },
}
```

## 🎯 Implementation Details

### Shader Pipeline

1. **Splat**: Adds velocity and density at cursor position using Gaussian distribution
2. **Curl**: Calculates vorticity (rotation) of the velocity field
3. **Vorticity**: Applies vorticity confinement for enhanced swirling
4. **Divergence**: Computes velocity field divergence
5. **Pressure**: Solves for pressure to maintain incompressibility (iterative)
6. **Gradient Subtract**: Removes pressure gradient from velocity
7. **Advection**: Moves velocity and density through the field
8. **Post-processing**: Composites fluid with background and applies color

### Double Buffering

The simulation uses ping-pong rendering (double buffering) for:
- Density field
- Velocity field
- Pressure field

This technique allows reading from one buffer while writing to another, then swapping them for the next frame.

## 📝 Migration Notes

This project is a precise migration of cursor dynamic effects from the giats-portfolio project with the following improvements:

- ✅ Upgraded to Next.js 16 (from 14)
- ✅ Upgraded to React 19 (from 18.2)
- ✅ Full TypeScript implementation
- ✅ Latest stable versions of all Three.js libraries
- ✅ Turbopack optimization (Next.js 16 default)
- ✅ App Router architecture (Next.js App Directory)
- ✅ Isolated implementation with no external dependencies

## 🎮 Usage

Simply move your mouse (or touch on mobile) across the white background to see the fluid effects in action. The "Home" text in the center provides a visual reference point.

## 🔧 Troubleshooting

### Build Errors

If you encounter shader loading errors:
1. Ensure `raw-loader` is installed: `pnpm add -D raw-loader`
2. Check that `types/shaders.d.ts` exists and is included in tsconfig.json

### Performance Issues

If the simulation is slow:
1. Reduce `dyeRes` and `simRes` in useOpts.tsx
2. Decrease the `swirl` parameter (pressure iterations)
3. Check that your GPU supports WebGL 2.0

## 📄 License

This project is part of the personal-portfolio-website-v1 repository.

## 🙏 Acknowledgments

Original fluid simulation implementation inspired by PavelDoGreat's WebGL Fluid Simulation.
