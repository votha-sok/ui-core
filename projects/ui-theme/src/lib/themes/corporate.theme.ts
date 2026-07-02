import { ThemeDefinition } from '../types/theme.types';

export const corporateTheme: ThemeDefinition = {
  name: 'corporate',
  label: 'Corporate',
  isDark: false,
  palette: {
    'cui-is-dark': '0',

    // Primary — Corporate Blue
    'mat-sys-primary': '#1d4ed8',
    'mat-sys-on-primary': '#ffffff',
    'mat-sys-primary-container': '#dbeafe',
    'mat-sys-on-primary-container': '#1e3a8a',

    // Secondary — Gray
    'mat-sys-secondary': '#4b5563',
    'mat-sys-on-secondary': '#ffffff',
    'mat-sys-secondary-container': '#f3f4f6',
    'mat-sys-on-secondary-container': '#111827',

    // Tertiary — Teal
    'mat-sys-tertiary': '#0f766e',
    'mat-sys-on-tertiary': '#ffffff',
    'mat-sys-tertiary-container': '#ccfbf1',
    'mat-sys-on-tertiary-container': '#134e4a',

    // Error
    'mat-sys-error': '#dc2626',
    'mat-sys-on-error': '#ffffff',
    'mat-sys-error-container': '#fee2e2',
    'mat-sys-on-error-container': '#7f1d1d',

    // Background / Surface
    'mat-sys-background': '#f9fafb',
    'mat-sys-on-background': '#111827',

    'mat-sys-surface': '#ffffff',
    'mat-sys-on-surface': '#111827',
    'mat-sys-surface-variant': '#f3f4f6',
    'mat-sys-on-surface-variant': '#4b5563',
    'mat-sys-surface-container-lowest': '#ffffff',
    'mat-sys-surface-container-low': '#f9fafb',
    'mat-sys-surface-container': '#f3f4f6',
    'mat-sys-surface-container-high': '#e5e7eb',
    'mat-sys-surface-container-highest': '#d1d5db',

    'mat-sys-outline': '#9ca3af',
    'mat-sys-outline-variant': '#e5e7eb',

    // Sidebar — charcoal
    'cui-sidebar-bg': '#111827',
    'cui-sidebar-text': '#9ca3af',
    'cui-sidebar-active-bg': '#1d4ed8',
    'cui-sidebar-active-text': '#ffffff',
    'cui-sidebar-hover-bg': '#1f2937',
    'cui-sidebar-border': '#1f2937',

    // Topbar
    'cui-topbar-bg': '#ffffff',
    'cui-topbar-text': '#111827',
    'cui-topbar-border': '#e5e7eb',

    // Card
    'cui-card-bg': '#ffffff',
    'cui-card-border': '#e5e7eb',

    // Radius — subtle rounding
    'cui-radius-sm': '3px',
    'cui-radius-md': '6px',
    'cui-radius-lg': '8px',
    'cui-radius-xl': '12px',

    // Shadows
    'cui-shadow-sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    'cui-shadow-md': '0 4px 6px -1px rgb(0 0 0 / 0.07)',
    'cui-shadow-lg': '0 10px 15px -3px rgb(0 0 0 / 0.07)',
  },
};
