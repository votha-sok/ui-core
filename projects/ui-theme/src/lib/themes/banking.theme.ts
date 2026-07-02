import { ThemeDefinition } from '../types/theme.types';

export const bankingTheme: ThemeDefinition = {
  name: 'banking',
  label: 'Banking',
  isDark: false,
  palette: {
    'cui-is-dark': '0',

    // Primary — Deep Navy
    'mat-sys-primary': '#1e3a5f',
    'mat-sys-on-primary': '#ffffff',
    'mat-sys-primary-container': '#dbeafe',
    'mat-sys-on-primary-container': '#1e3a5f',

    // Secondary — Gold
    'mat-sys-secondary': '#b45309',
    'mat-sys-on-secondary': '#ffffff',
    'mat-sys-secondary-container': '#fef3c7',
    'mat-sys-on-secondary-container': '#78350f',

    // Tertiary — Steel Blue
    'mat-sys-tertiary': '#1d4ed8',
    'mat-sys-on-tertiary': '#ffffff',
    'mat-sys-tertiary-container': '#dbeafe',
    'mat-sys-on-tertiary-container': '#1e3a8a',

    // Error
    'mat-sys-error': '#dc2626',
    'mat-sys-on-error': '#ffffff',
    'mat-sys-error-container': '#fee2e2',
    'mat-sys-on-error-container': '#7f1d1d',

    // Background / Surface
    'mat-sys-background': '#f0f4f8',
    'mat-sys-on-background': '#0d1b2a',

    'mat-sys-surface': '#ffffff',
    'mat-sys-on-surface': '#0d1b2a',
    'mat-sys-surface-variant': '#e8edf2',
    'mat-sys-on-surface-variant': '#3d5166',
    'mat-sys-surface-container-lowest': '#ffffff',
    'mat-sys-surface-container-low': '#f0f4f8',
    'mat-sys-surface-container': '#e8edf2',
    'mat-sys-surface-container-high': '#dce3eb',
    'mat-sys-surface-container-highest': '#cdd7e0',

    'mat-sys-outline': '#7a96ad',
    'mat-sys-outline-variant': '#cdd7e0',

    // Sidebar — dark navy with gold active state
    'cui-sidebar-bg': '#0d1b2a',
    'cui-sidebar-text': '#a3bdd1',
    'cui-sidebar-active-bg': '#b45309',
    'cui-sidebar-active-text': '#ffffff',
    'cui-sidebar-hover-bg': '#1e3a5f',
    'cui-sidebar-border': '#1e3a5f',

    // Topbar
    'cui-topbar-bg': '#1e3a5f',
    'cui-topbar-text': '#ffffff',
    'cui-topbar-border': '#2d5282',

    // Card
    'cui-card-bg': '#ffffff',
    'cui-card-border': '#dce3eb',

    // Radius — tighter radius, more formal look
    'cui-radius-sm': '2px',
    'cui-radius-md': '4px',
    'cui-radius-lg': '6px',
    'cui-radius-xl': '8px',

    // Shadows
    'cui-shadow-sm': '0 1px 3px 0 rgb(0 0 0 / 0.08)',
    'cui-shadow-md': '0 4px 6px -1px rgb(0 0 0 / 0.08)',
    'cui-shadow-lg': '0 10px 15px -3px rgb(0 0 0 / 0.08)',
  },
};
