/**
 * NOTE: ui-utils must have zero workspace-internal dependencies.
 * We intentionally do NOT import IconSize from ui-icons here — that would
 * violate the dependency graph (ui-utils ← ui-icons is disallowed).
 * Instead we redeclare the same literal union locally. If you change the
 * size scale in ui-icons, update this type in sync.
 */
export type MenuIconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * A single item in the navigation menu.
 * Items can be nested to any depth via the `children` array.
 */
export interface MenuItem {
  /** Unique identifier for this item. */
  id: string;
  /** Display label shown in the sidebar and breadcrumbs. */
  label: string;
  /** Optional router link. Absent items act as group headers. */
  routerLink?: string;
  /** Icon name resolved by <cui-icon> (Material Symbol or custom SVG). */
  icon?: string;
  /** Icon size. Defaults to 'sm'. */
  iconSize?: MenuIconSize;
  /** Badge content (e.g. notification count or "NEW"). */
  badge?: string | number;
  /** Badge colour variant. */
  badgeColor?: 'primary' | 'error' | 'warning' | 'success' | 'info';
  /** Permission key required to see this item. */
  permission?: string;
  /** When true, this item is always hidden. */
  hidden?: boolean;
  /** Shown but not interactive. */
  disabled?: boolean;
  /** Child items — renders this item as a collapsible group. */
  children?: MenuItem[];
  /** Group starts expanded. */
  expanded?: boolean;
  /** Divider rendered above this item. */
  dividerBefore?: boolean;
  /** Arbitrary extra data. */
  data?: Record<string, unknown>;
}

/**
 * Flat representation of a menu item with resolved metadata.
 */
export interface ResolvedMenuItem extends MenuItem {
  /** Full ancestor chain, root-first. */
  ancestors: MenuItem[];
  /** Depth in the tree (root = 0). */
  depth: number;
  /** True if this item or any descendant matches the current route. */
  isActive: boolean;
  /** True if routerLink exactly matches the current URL. */
  isExactActive: boolean;
  /** Whether the current user has the required permission. */
  isVisible: boolean;
}
