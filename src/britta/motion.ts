/** Material 3 motion tokens — shared by web CSS and Compose tween specs. */

export const MOTION = {
  duration: {
    short1: 50,
    short2: 100,
    short3: 150,
    short4: 200,
    medium1: 250,
    medium2: 300,
    medium3: 350,
    medium4: 400,
    long1: 450,
    long2: 500,
    long3: 550,
    long4: 600,
  },
  easing: {
    standard: "cubic-bezier(0.2, 0, 0, 1)",
    standardDecelerate: "cubic-bezier(0, 0, 0, 1)",
    standardAccelerate: "cubic-bezier(0.3, 0, 1, 1)",
    emphasized: "cubic-bezier(0.2, 0, 0, 1)",
    emphasizedDecelerate: "cubic-bezier(0.05, 0.7, 0.1, 1)",
    emphasizedAccelerate: "cubic-bezier(0.3, 0, 0.8, 0.15)",
    linear: "linear",
  },
} as const;

export const ELEVATION = [
  {
    level: 0,
    label: "Level 0",
    dp: 0,
    use: "Idle surface",
    css: "none",
    compose: "BrittaElevation.level0",
  },
  {
    level: 1,
    label: "Level 1",
    dp: 1,
    use: "Cards at rest, switches",
    css: "var(--shadow-elev-1)",
    compose: "BrittaElevation.level1",
  },
  {
    level: 2,
    label: "Level 2",
    dp: 3,
    use: "Raised cards, menus",
    css: "var(--shadow-elev-2)",
    compose: "BrittaElevation.level2",
  },
  {
    level: 3,
    label: "Level 3",
    dp: 6,
    use: "FAB, dragged cards",
    css: "var(--shadow-elev-3)",
    compose: "BrittaElevation.level3",
  },
  {
    level: 4,
    label: "Level 4",
    dp: 8,
    use: "Navigation drawer",
    css: "var(--shadow-elev-4)",
    compose: "BrittaElevation.level4",
  },
  {
    level: 5,
    label: "Level 5",
    dp: 12,
    use: "Modal, dialog",
    css: "var(--shadow-elev-5)",
    compose: "BrittaElevation.level5",
  },
] as const;
