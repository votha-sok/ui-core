import { ThemeDefinition } from '../types/theme.types';

export const lightTheme: ThemeDefinition = {
  name: 'light',
  label: 'Light',
  isDark: false,
  palette: {
    'cui-is-dark': '0',

    // Primary — Indigo
    'mat-sys-primary': '#4f46e5',
    'mat-sys-on-primary': '#ffffff',
    'mat-sys-primary-container': '#e0e7ff',
    'mat-sys-on-primary-container': '#1e1b4b',

    // Secondary — Violet
    'mat-sys-secondary': '#7c3aed',
    'mat-sys-on-secondary': '#ffffff',
    'mat-sys-secondary-container': '#ede9fe',
    'mat-sys-on-secondary-container': '#2e1065',

    // Tertiary — Cyan
    'mat-sys-tertiary': '#0891b2',
    'mat-sys-on-tertiary': '#ffffff',
    'mat-sys-tertiary-container': '#cffafe',
    'mat-sys-on-tertiary-container': '#164e63',

    // Error
    'mat-sys-error': '#dc2626',
    'mat-sys-on-error': '#ffffff',
    'mat-sys-error-container': '#fee2e2',
    'mat-sys-on-error-container': '#7f1d1d',

    // Background / Surface
    'mat-sys-background': '#f8fafc',
    'mat-sys-on-background': '#0f172a',

    'mat-sys-surface': '#ffffff',
    'mat-sys-on-surface': '#0f172a',
    'mat-sys-surface-variant': '#f1f5f9',
    'mat-sys-on-surface-variant': '#475569',
    'mat-sys-surface-container-lowest': '#ffffff',
    'mat-sys-surface-container-low': '#f8fafc',
    'mat-sys-surface-container': '#f1f5f9',
    'mat-sys-surface-container-high': '#e2e8f0',
    'mat-sys-surface-container-highest': '#cbd5e1',

    'mat-sys-outline': '#94a3b8',
    'mat-sys-outline-variant': '#e2e8f0',

    // Sidebar
    'cui-sidebar-bg': '#1e293b',
    'cui-sidebar-text': '#cbd5e1',
    'cui-sidebar-active-bg': '#4f46e5',
    'cui-sidebar-active-text': '#ffffff',
    'cui-sidebar-hover-bg': '#334155',
    'cui-sidebar-border': '#334155',

    // Topbar
    'cui-topbar-bg': '#ffffff',
    'cui-topbar-text': '#0f172a',
    'cui-topbar-border': '#e2e8f0',

    // Card
    'cui-card-bg': '#ffffff',
    'cui-card-border': '#e2e8f0',

    // Radius
    'cui-radius-sm': '4px',
    'cui-radius-md': '8px',
    'cui-radius-lg': '12px',
    'cui-radius-xl': '16px',

    // Shadows
    'cui-shadow-sm': '0 1px 3px 0 rgb(0 0 0 / 0.1)',
    'cui-shadow-md': '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    'cui-shadow-lg': '0 10px 15px -3px rgb(0 0 0 / 0.1)',
  },
};
