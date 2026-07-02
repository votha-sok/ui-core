import { ThemeDefinition } from '../types/theme.types';

export const blueTheme: ThemeDefinition = {
  name: 'blue',
  label: 'Blue',
  isDark: false,
  palette: {
    'cui-is-dark': '0',

    // Primary — Bright Blue
    'mat-sys-primary': '#2563eb',
    'mat-sys-on-primary': '#ffffff',
    'mat-sys-primary-container': '#dbeafe',
    'mat-sys-on-primary-container': '#1e3a8a',

    // Secondary — Sky
    'mat-sys-secondary': '#0284c7',
    'mat-sys-on-secondary': '#ffffff',
    'mat-sys-secondary-container': '#e0f2fe',
    'mat-sys-on-secondary-container': '#0c4a6e',

    // Tertiary — Indigo
    'mat-sys-tertiary': '#4f46e5',
    'mat-sys-on-tertiary': '#ffffff',
    'mat-sys-tertiary-container': '#e0e7ff',
    'mat-sys-on-tertiary-container': '#1e1b4b',

    // Error
    'mat-sys-error': '#dc2626',
    'mat-sys-on-error': '#ffffff',
    'mat-sys-error-container': '#fee2e2',
    'mat-sys-on-error-container': '#7f1d1d',

    // Background / Surface
    'mat-sys-background': '#f0f9ff',
    'mat-sys-on-background': '#0c1a2e',

    'mat-sys-surface': '#ffffff',
    'mat-sys-on-surface': '#0c1a2e',
    'mat-sys-surface-variant': '#e0f2fe',
    'mat-sys-on-surface-variant': '#0369a1',
    'mat-sys-surface-container-lowest': '#ffffff',
    'mat-sys-surface-container-low': '#f0f9ff',
    'mat-sys-surface-container': '#e0f2fe',
    'mat-sys-surface-container-high': '#bae6fd',
    'mat-sys-surface-container-highest': '#7dd3fc',

    'mat-sys-outline': '#7dd3fc',
    'mat-sys-outline-variant': '#bae6fd',

    // Sidebar — deep blue
    'cui-sidebar-bg': '#1e3a8a',
    'cui-sidebar-text': '#bfdbfe',
    'cui-sidebar-active-bg': '#2563eb',
    'cui-sidebar-active-text': '#ffffff',
    'cui-sidebar-hover-bg': '#1d4ed8',
    'cui-sidebar-border': '#1d4ed8',

    // Topbar
    'cui-topbar-bg': '#2563eb',
    'cui-topbar-text': '#ffffff',
    'cui-topbar-border': '#1d4ed8',

    // Card
    'cui-card-bg': '#ffffff',
    'cui-card-border': '#bae6fd',

    // Radius
    'cui-radius-sm': '4px',
    'cui-radius-md': '8px',
    'cui-radius-lg': '12px',
    'cui-radius-xl': '16px',

    // Shadows (blue-tinted)
    'cui-shadow-sm': '0 1px 3px 0 rgb(37 99 235 / 0.12)',
    'cui-shadow-md': '0 4px 6px -1px rgb(37 99 235 / 0.12)',
    'cui-shadow-lg': '0 10px 15px -3px rgb(37 99 235 / 0.12)',
  },
};
