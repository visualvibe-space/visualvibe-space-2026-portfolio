# VisualVibe Site - Design System & Theme Guide

## Overview
Dark, professional theme with a deep blue palette designed for a creative agency specializing in digital services.

---

## Color Palette

### Primary Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `--color-primary` | `#0a0e17` | Main dark background |
| `--color-primary-light` | `#111827` | Secondary dark surfaces |
| `--color-primary-dark` | `#070a10` | Deepest backgrounds |

### Secondary Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `--color-secondary` | `#ffffff` | Primary text on dark |
| `--color-secondary-dark` | `#f1f5f9` | Light text variant |
| `--color-secondary-light` | `#f8fafc` | Hover states |

### Accent Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `--color-accent` | `#1e40af` | Primary accent (buttons, links) |
| `--color-accent-hover` | `#1e3a8a` | Hover state for accent |
| `--color-accent-light` | `#3b82f6` | Highlights, cursor blink |
| `--color-accent-muted` | `#2563eb` | Secondary accent |

### Text Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `--color-text-primary` | `#f8fafc` | Main text |
| `--color-text-secondary` | `#94a3b8` | Subdued text |
| `--color-text-muted` | `#64748b` | Disabled/placeholder |

### Background Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `--color-bg-primary` | `#0a0e17` | Page background |
| `--color-bg-secondary` | `#0f172a` | Cards, sections |
| `--color-bg-tertiary` | `#111827` | Elevated surfaces |
| `--color-bg-dark` | `#070a10` | Footer, darkest areas |

### Border Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `--color-border` | `#1e293b` | Default borders |
| `--color-border-light` | `#334155` | Hover borders |

---

## Typography

### Font Families
| Token | Font | Usage |
|-------|------|-------|
| `--font-sans` | Inter | Body text, UI elements |
| `--font-display` | Montserrat | Headings, titles |

### Font Weights
| Weight | Value | Usage |
|--------|-------|-------|
| Light | 300 | Large decorative text |
| Regular | 400 | Body text |
| Medium | 500 | Subheadings |
| Semi-bold | 600 | Buttons, nav |
| Bold | 700 | Headings |
| Extra-bold | 800 | Hero text |

---

## Spacing

### Section Padding
- Mobile: `5rem 1rem`
- Tablet: `6rem 2rem`
- Desktop: `8rem 4rem`

### Container
- Max-width: `1280px`
- Mobile padding: `1rem`
- Tablet padding: `2rem`
- Desktop padding: `4rem`

---

## Effects

### Glass Effect
```css
background: rgba(15, 23, 42, 0.9);
backdrop-filter: blur(12px);
border-bottom: 1px solid var(--color-border);
```

### Animations
| Name | Duration | Easing | Usage |
|------|----------|--------|-------|
| fade-in | 0.6s | `cubic-bezier(0.16, 1, 0.3, 1)` | Page load |
| slide-up | 0.8s | `cubic-bezier(0.22, 1, 0.36, 1)` | Scroll reveals |
| scale-in | 0.5s | `cubic-bezier(0.16, 1, 0.3, 1)` | Modal/overlay |
| float | 6s | ease-in-out | Decorative elements |

### Custom Cursor Blink
- Color: `#3b82f6`
- Glow: Blue box-shadow pulse animation

---

## Component Guidelines

### Buttons
- Background: `--color-accent`
- Hover: `--color-accent-hover`
- Text: White

### Cards
- Background: `--color-bg-secondary`
- Border: `--color-border`
- Border-radius: 12px (recommended)

### Scrollbar
- Track: `--color-bg-secondary`
- Thumb: `--color-accent`
- Thumb hover: `--color-accent-hover`

---

## Responsive Breakpoints
| Breakpoint | Width |
|------------|-------|
| Mobile | < 768px |
| Tablet | 768px - 1023px |
| Desktop | >= 1024px |

---

## Accessibility

### Focus States
```css
outline: 2px solid var(--color-accent);
outline-offset: 2px;
```

### Selection
- Background: `--color-accent`
- Text: White

### Reduced Motion
Respects `prefers-reduced-motion` media query - disables all animations.
