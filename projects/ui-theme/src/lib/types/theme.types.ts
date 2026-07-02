/**
 * All recognized theme names in the company-ui framework.
 * Extending themes means adding a value here AND a matching ThemePalette object.
 */
export type ThemeName =
  | 'light'
  | 'dark'
  | 'banking'
  | 'corporate'
  | 'blue'
  | 'green'
  | 'purple';

/**
 * A palette maps every CSS custom property we override onto a concrete value.
 * Properties are keyed without the leading `--` so they can be used in both
 * typed TS objects and CSS-variable generation code without string munging.
 *
 * We override Material's --mat-sys-* tokens directly so that Material
 * components (mat-button, mat-card, etc.) are themed automatically — no
 * secondary mapping layer required.
 *
 * Property naming convention: mat-sys-* mirrors Material's M3 system tokens.
 * cui-* are framework-specific additions that have no Material equivalent
 * (sidebar background, topbar background, etc.).
 */
export interface ThemePalette {
  // ── M3 System Colour Roles ────────────────────────────────────────────────
  'mat-sys-primary': string;
  'mat-sys-on-primary': string;
  'mat-sys-primary-container': string;
  'mat-sys-on-primary-container': string;

  'mat-sys-secondary': string;
  'mat-sys-on-secondary': string;
  'mat-sys-secondary-container': string;
  'mat-sys-on-secondary-container': string;

  'mat-sys-tertiary': string;
  'mat-sys-on-tertiary': string;
  'mat-sys-tertiary-container': string;
  'mat-sys-on-tertiary-container': string;

  'mat-sys-error': string;
  'mat-sys-on-error': string;
  'mat-sys-error-container': string;
  'mat-sys-on-error-container': string;

  'mat-sys-background': string;
  'mat-sys-on-background': string;

  'mat-sys-surface': string;
  'mat-sys-on-surface': string;
  'mat-sys-surface-variant': string;
  'mat-sys-on-surface-variant': string;
  'mat-sys-surface-container-lowest': string;
  'mat-sys-surface-container-low': string;
  'mat-sys-surface-container': string;
  'mat-sys-surface-container-high': string;
  'mat-sys-surface-container-highest': string;

  'mat-sys-outline': string;
  'mat-sys-outline-variant': string;

  // ── Framework-specific tokens (no Material equivalent) ───────────────────
  /** Whether this palette is a dark-mode palette. Used by ThemeService. */
  'cui-is-dark': '0' | '1';

  /** Sidebar background — distinct from surface to allow richer branding */
  'cui-sidebar-bg': string;
  'cui-sidebar-text': string;
  'cui-sidebar-active-bg': string;
  'cui-sidebar-active-text': string;
  'cui-sidebar-hover-bg': string;
  'cui-sidebar-border': string;

  /** Topbar */
  'cui-topbar-bg': string;
  'cui-topbar-text': string;
  'cui-topbar-border': string;

  /** Card / content surface */
  'cui-card-bg': string;
  'cui-card-border': string;

  /** Global border radius scale */
  'cui-radius-sm': string;
  'cui-radius-md': string;
  'cui-radius-lg': string;
  'cui-radius-xl': string;

  /** Shadow scale */
  'cui-shadow-sm': string;
  'cui-shadow-md': string;
  'cui-shadow-lg': string;
}

/**
 * A complete theme — its name + the full palette.
 */
export interface ThemeDefinition {
  name: ThemeName;
  label: string;          // human-readable label for UI switchers
  isDark: boolean;        // convenience flag — mirrors cui-is-dark
  palette: ThemePalette;
}
