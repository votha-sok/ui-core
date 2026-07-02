import {
  Injectable,
  inject,
  signal,
  computed,
  effect,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';

/** A single segment in the breadcrumb trail. */
export interface BreadcrumbSegment {
  /** Display label for this segment. */
  label: string;
  /** Router link. Omit for the last (current) segment. */
  routerLink?: string;
  /** Whether this segment represents the current page. */
  isCurrent?: boolean;
}

@Injectable({ providedIn: 'root' })
export class BreadcrumbService {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  /**
   * When set, completely overrides automatic route-based generation.
   * Clear by calling clearOverride().
   */
  private readonly _override = signal<BreadcrumbSegment[] | null>(null);

  /**
   * Breadcrumbs auto-generated from the active route's `data.breadcrumb`
   * config. Re-evaluates on every NavigationEnd event.
   */
  private readonly _routeBreadcrumbs = toSignal(
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(() => this.buildFromRoute(this.activatedRoute.root))
    ),
    { initialValue: this.buildFromRoute(this.activatedRoute.root) }
  );

  /**
   * The active breadcrumb trail.
   * Returns the manual override if set, otherwise the auto-generated trail.
   */
  readonly breadcrumbs = computed<BreadcrumbSegment[]>(
    () => this._override() ?? this._routeBreadcrumbs()
  );

  // ── Public API ─────────────────────────────────────────────────────────────

  /**
   * Manually set breadcrumbs, bypassing route-based generation.
   * Useful for dynamic pages where the breadcrumb depends on loaded data
   * (e.g. "Home / Cases / Case #1234" where "Case #1234" comes from an API).
   *
   * @example
   * breadcrumbService.setBreadcrumbs([
   *   { label: 'Home', routerLink: '/' },
   *   { label: 'Cases', routerLink: '/cases' },
   *   { label: `Case #${caseId}`, isCurrent: true },
   * ]);
   */
  setBreadcrumbs(segments: BreadcrumbSegment[]): void {
    this._override.set(segments);
  }

  /**
   * Remove any manual override and revert to route-based generation.
   */
  clearOverride(): void {
    this._override.set(null);
  }

  /**
   * Append a segment to the current trail.
   * Creates a manual override if one isn't already set.
   */
  push(segment: BreadcrumbSegment): void {
    const current = this._override() ?? this._routeBreadcrumbs();
    this._override.set([...current, segment]);
  }

  // ── Private helpers ────────────────────────────────────────────────────────

  /**
   * Walk the activated route tree from root to the deepest active route,
   * collecting any `data.breadcrumb` values along the way.
   *
   * Route config example:
   * {
   *   path: 'cases',
   *   data: { breadcrumb: 'Cases' },
   *   children: [
   *     {
   *       path: ':id',
   *       data: { breadcrumb: 'Case Detail' }
   *     }
   *   ]
   * }
   */
  private buildFromRoute(
    route: ActivatedRoute,
    url = '',
    segments: BreadcrumbSegment[] = []
  ): BreadcrumbSegment[] {
    const children = route.children;

    if (children.length === 0) {
      return segments;
    }

    for (const child of children) {
      const routeUrl = child.snapshot.url
        .map(s => s.path)
        .join('/');

      const fullUrl = routeUrl ? `${url}/${routeUrl}` : url;

      const breadcrumbLabel = child.snapshot.data?.['breadcrumb'];

      if (breadcrumbLabel) {
        segments.push({
          label: breadcrumbLabel as string,
          routerLink: fullUrl || '/',
        });
      }

      return this.buildFromRoute(child, fullUrl, segments);
    }

    return segments;
  }
}
