// Poses for the persistent laptop, one per story section.
// x / y: position in viewport half-extents (-1 left/bottom … 1 right/top)
// rx / ry / rz: rotation in radians (rx = PI/2 means lying flat, top facing the viewer)
// lid: how far the lid is open, in radians (0 closed, ~1.9 fully open)
// scale: relative to a responsive base size; screen: what the display shows
// m: overrides for narrow (phone) viewports
const PI = Math.PI

export const STAGES = {
  hero: {
    x: -0.04, y: -0.1, rx: PI / 2 - 0.32, ry: 0.18, rz: -0.38, lid: 0, scale: 0.85, screen: 'logo', glow: 0,
    m: { x: 0, y: 0.0, scale: 0.68 },
  },
  reveal: {
    x: 0, y: -0.02, rx: 0.32, ry: -0.62, rz: 0.04, lid: 1.9, scale: 1.0, screen: 'logo',
    m: { y: 0.02, scale: 0.85 },
  },
  built: {
    x: 0, y: -0.2, rx: 0.12, ry: 0, rz: 0, lid: 1.82, scale: 0.95, screen: 'code',
    m: { y: -0.05, scale: 0.9 },
  },
  word: {
    x: 0, y: 0.02, rx: 0.75, ry: 0.55, rz: 0.25, lid: 1.35, scale: 0.62, screen: 'code', glow: 1,
    m: { scale: 0.55 },
  },
  away: {
    x: 0.55, y: 1.6, rx: 0.5, ry: -0.9, rz: 0.2, lid: 1.2, scale: 0.6, screen: 'code', glow: 0,
    m: { x: 0 },
  },
  contact: {
    x: 0.5, y: 0.0, rx: 0.42, ry: -0.95, rz: 0.06, lid: 1.05, scale: 0.8, screen: 'logo',
    m: { x: 0, y: 0.4, scale: 0.55 },
  },
  footer: {
    x: 0.0, y: -1.35, rx: PI / 2, ry: 0, rz: 0.3, lid: 0, scale: 0.9, screen: 'logo', glow: 0,
    m: { y: -1.4 },
  },
}

export function projectStage(i) {
  const left = i % 2 === 0 // laptop on the right, text on the left for even rows
  return {
    x: left ? 0.3 : -0.3,
    y: -0.02,
    rx: 0.16,
    ry: left ? -0.38 : 0.38,
    rz: 0,
    lid: 1.85,
    scale: 1.05,
    screen: `p${i}`,
    m: { x: 0, y: 0.36, ry: left ? -0.2 : 0.2, scale: 0.82 },
  }
}

export function resolveStage(name, narrow) {
  const base = name.startsWith('project-') ? projectStage(Number(name.split('-')[1])) : STAGES[name]
  if (!base) return null
  return narrow && base.m ? { ...base, ...base.m } : base
}
