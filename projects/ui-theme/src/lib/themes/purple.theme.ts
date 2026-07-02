import { ThemeDefinition } from '../types/theme.types';

export const purpleTheme: ThemeDefinition = {
  name: 'purple',
  label: 'Purple',
  isDark: false,
  palette: {
    'cui-is-dark': '0',

    // Primary — Violet
    'mat-sys-primary': '#7c3aed',
    'mat-sys-on-primary': '#ffffff',
    'mat-sys-primary-container': '#ede9fe',
    'mat-sys-on-primary-container': '#2e1065',

    // Secondary — Purple
    'mat-sys-secondary': '#9333ea',
    'mat-sys-on-secondary': '#ffffff',
    'mat-sys-secondary-container': '#f3e8ff',
    'mat-sys-on-secondary-container': '#3b0764',

    // Tertiary — Pink
    'mat-sys-tertiary': '#db2777',
    'mat-sys-on-tertiary': '#ffffff',
    'mat-sys-tertiary-container': '#fce7f3',
    'mat-sys-on-tertiary-container': '#831843',

    // Error
    'mat-sys-error': '#dc2626',
    'mat-sys-on-error': '#ffffff',
    'mat-sys-error-container': '#fee2e2',
    'mat-sys-on-error-container': '#7f1d1d',

    // Background / Surface
    'mat-sys-background': '#faf5ff',
    'mat-sys-on-background': '#1a0533',

    'mat-sys-surface': '#ffffff',
    'mat-sys-on-surface': '#1a0533',
    'mat-sys-surface-variant': '#f3e8ff',
    'mat-sys-on-surface-variant': '#6b21a8',
    'mat-sys-surface-container-lowest': '#ffffff',
    'mat-sys-surface-container-low': '#faf5ff',
    'mat-sys-surface-container': '#f3e8ff',
    'mat-sys-surface-container-high': '#e9d5ff',
    'mat-sys-surface-container-highest': '#d8b4fe',

    'mat-sys-outline': '#c084fc',
    'mat-sys-outline-variant': '#e9d5ff',

    // Sidebar — deep purple
    'cui-sidebar-bg': '#1a0533',
    'cui-sidebar-text': '#d8b4fe',
    'cui-sidebar-active-bg': '#7c3aed',
    'cui-sidebar-active-text': '#ffffff',
    'cui-sidebar-hover-bg': '#2e1065',
    'cui-sidebar-border': '#2e1065',

    // Topbar
    'cui-topbar-bg': '#7c3aed',
    'cui-topbar-text': '#ffffff',
    'cui-topbar-border': '#6d28d9',

    // Card
    'cui-card-bg': '#ffffff',
    'cui-card-border': '#e9d5ff',

    // Radius — slightly more rounded, softer feel
    'cui-radius-sm': '6px',
    'cui-radius-md': '10px',
    'cui-radius-lg': '14px',
    'cui-radius-xl': '20px',

    // Shadows (purple-tinted)
    'cui-shadow-sm': '0 1px 3px 0 rgb(124 58 237 / 0.12)',
    'cui-shadow-md': '0 4px 6px -1px rgb(124 58 237 / 0.12)',
    'cui-shadow-lg': '0 10px 15px -3px rgb(124 58 237 / 0.12)',
  },
};
