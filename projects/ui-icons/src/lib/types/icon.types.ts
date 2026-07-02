/**
 * The visual size of the icon.
 * Maps to concrete pixel values in the component styles.
 * Using a named scale instead of raw pixel inputs keeps sizing
 * consistent across the entire application.
 */
export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Which font family to use when rendering a Material Symbol.
 * - outlined: stroked style (default, recommended for UI)
 * - rounded:  rounded corners, friendlier feel
 * - sharp:    square corners, more formal
 */
export type MaterialSymbolVariant = 'outlined' | 'rounded' | 'sharp';

/**
 * Internal resolved source for a given icon name.
 * Used by the component to decide which render path to take.
 */
export type IconSource = 'svg' | 'material-symbol';

/**
 * An entry in the SVG registry.
 * The svg string must be a full <svg>…</svg> element.
 */
export interface SvgIconEntry {
  name: string;
  svg: string;
}

/**
 * Pixel dimensions for each named size.
 * Exported so consuming components can reference the same scale.
 */
export const ICON_SIZE_MAP: Record<IconSize, number> = {
  xs: 14,
  sm: 18,
  md: 24,
  lg: 32,
  xl: 48,
};
