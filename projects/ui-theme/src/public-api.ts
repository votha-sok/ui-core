/*
 * Public API Surface of ui-theme
 * This is the ONLY file other projects may import from.
 */

// Types
export * from './lib/types/theme.types';

// Theme definitions — exported so consuming apps can reference palettes
// directly (e.g. for building custom theme pickers or reading palette values
// without going through ThemeService).
export * from './lib/themes/light.theme';
export * from './lib/themes/dark.theme';
export * from './lib/themes/banking.theme';
export * from './lib/themes/corporate.theme';
export * from './lib/themes/blue.theme';
export * from './lib/themes/green.theme';
export * from './lib/themes/purple.theme';

// Service
export * from './lib/services/theme.service';
