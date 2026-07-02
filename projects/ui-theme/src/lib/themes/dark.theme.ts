import { ThemeDefinition } from '../types/theme.types';

export const darkTheme: ThemeDefinition = {
  name: 'dark',
  label: 'Dark',
  isDark: true,
  palette: {
    'cui-is-dark': '1',

    // Primary — Indigo (lighter for dark surfaces)
    'mat-sys-primary': '#818cf8',
    'mat-sys-on-primary': '#1e1b4b',
    'mat-sys-primary-container': '#3730a3',
    'mat-sys-on-primary-container': '#e0e7ff',

    // Secondary — Violet
    'mat-sys-secondary': '#a78bfa',
    'mat-sys-on-secondary': '#2e1065',
    'mat-sys-secondary-container': '#5b21b6',
    'mat-sys-on-secondary-container': '#ede9fe',

    // Tertiary — Cyan
    'mat-sys-tertiary': '#22d3ee',
    'mat-sys-on-tertiary': '#164e63',
    'mat-sys-tertiary-container': '#0e7490',
    'mat-sys-on-tertiary-container': '#cffafe',

    // Error
    'mat-sys-error': '#f87171',
    'mat-sys-on-error': '#7f1d1d',
    'mat-sys-error-container': '#991b1b',
    'mat-sys-on-error-container': '#fee2e2',

    // Background / Surface
    'mat-sys-background': '#0f172a',
    'mat-sys-on-background': '#f1f5f9',

    'mat-sys-surface': '#1e293b',
    'mat-sys-on-surface': '#f1f5f9',
    'mat-sys-surface-variant': '#1e293b',
    'mat-sys-on-surface-variant': '#94a3b8',
    'mat-sys-surface-container-lowest': '#0f172a',
    'mat-sys-surface-container-low': '#1e293b',
    'mat-sys-surface-container': '#263348',
    'mat-sys-surface-container-high': '#2d3d56',
    'mat-sys-surface-container-highest': '#334155',

    'mat-sys-outline': '#475569',
    'mat-sys-outline-variant': '#334155',

    // Sidebar
    'cui-sidebar-bg': '#0f172a',
    'cui-sidebar-text': '#94a3b8',
    'cui-sidebar-active-bg': '#818cf8',
    'cui-sidebar-active-text': '#1e1b4b',
    'cui-sidebar-hover-bg': '#1e293b',
    'cui-sidebar-border': '#1e293b',

    // Topbar
    'cui-topbar-bg': '#1e293b',
    'cui-topbar-text': '#f1f5f9',
    'cui-topbar-border': '#334155',

    // Card
    'cui-card-bg': '#1e293b',
    'cui-card-border': '#334155',

    // Radius
    'cui-radius-sm': '4px',
    'cui-radius-md': '8px',
    'cui-radius-lg': '12px',
    'cui-radius-xl': '16px',

    // Shadows
    'cui-shadow-sm': '0 1px 3px 0 rgb(0 0 0 / 0.4)',
    'cui-shadow-md': '0 4px 6px -1px rgb(0 0 0 / 0.4)',
    'cui-shadow-lg': '0 10px 15px -3px rgb(0 0 0 / 0.4)',
  },
};
