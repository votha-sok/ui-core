/*
 * Public API Surface of ui-utils
 * This is the ONLY file other projects may import from.
 */

// ── Tokens ────────────────────────────────────────────────────────────────────
export * from './lib/tokens/framework-version.token';

// ── Types ─────────────────────────────────────────────────────────────────────
export * from './lib/types/menu.types';
export * from './lib/types/toast.types';
export * from './lib/types/dialog.types';
// BreadcrumbSegment is defined in the service file (co-located with the service)
export type { BreadcrumbSegment } from './lib/services/breadcrumb.service';

// ── Services ──────────────────────────────────────────────────────────────────
export * from './lib/services/menu.service';
export * from './lib/services/breadcrumb.service';
export * from './lib/services/loading.service';
export * from './lib/services/permission.service';
export * from './lib/services/dialog.service';
export * from './lib/services/toast.service';

// ── Directives ────────────────────────────────────────────────────────────────
export * from './lib/directives/permission.directive';
