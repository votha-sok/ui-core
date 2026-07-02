import {
  Injectable,
  computed,
  inject,
  signal,
} from '@angular/core';
import { MenuItem, ResolvedMenuItem } from '../types/menu.types';
import { PermissionService } from './permission.service';

@Injectable({ providedIn: 'root' })
export class MenuService {
  private readonly permissionService = inject(PermissionService);

  // ── Private state ──────────────────────────────────────────────────────────

  /** The raw menu configuration set by the consuming app. */
  private readonly _items = signal<MenuItem[]>([]);

  /** Currently active URL, updated by the sidebar after router events. */
  private readonly _activeUrl = signal<string>('');

  /**
   * Per-item collapsed/expanded state keyed by item `id`.
   * Separate from the config so toggling doesn't mutate the original tree.
   */
  private readonly _expandedIds = signal<Set<string>>(new Set());

  // ── Public read-only signals ───────────────────────────────────────────────

  /**
   * Fully resolved menu tree with active state, visibility, and depth
   * computed for each item. Re-evaluates when items, URL, permissions,
   * or expanded state change.
   */
  readonly resolvedItems = computed<ResolvedMenuItem[]>(() =>
    this.resolveTree(this._items(), [], 0)
  );

  /** Flat list of all resolved items — useful for search. */
  readonly flatItems = computed<ResolvedMenuItem[]>(() =>
    this.flatten(this.resolvedItems())
  );

  /**
   * Breadcrumb trail for the current active URL.
   * Returns the ancestor chain of the deepest active item.
   */
  readonly activeBreadcrumbs = computed<ResolvedMenuItem[]>(() => {
    const activeLeaf = this.flatItems().find(i => i.isExactActive);
    if (!activeLeaf) return [];
    return [...activeLeaf.ancestors.map(a => ({
      ...a,
      ancestors: [],
      depth: 0,
      isActive: false,
      isExactActive: false,
      isVisible: true,
    }) as ResolvedMenuItem), activeLeaf];
  });

  // ── Configuration API ──────────────────────────────────────────────────────

  /**
   * Set the full menu configuration. Call this once during app bootstrap,
   * typically in AppComponent.ngOnInit or in a route resolver.
   *
   * @example
   * menuService.setItems(APP_MENU);
   */
  setItems(items: MenuItem[]): void {
    // Seed expanded state from items that declare `expanded: true`
    const expanded = new Set<string>();
    this.collectExpandedIds(items, expanded);
    this._expandedIds.set(expanded);
    this._items.set(items);
  }

  // ── Active route API ───────────────────────────────────────────────────────

  /**
   * Update the active URL. Called by the sidebar/layout component after
   * subscribing to Router.events (NavigationEnd).
   * Deliberately not Router-coupled here — ui-utils has no router dependency.
   */
  activateByUrl(url: string): void {
    // Normalize: strip query string and fragment for matching
    this._activeUrl.set(url.split('?')[0].split('#')[0]);
  }

  // ── Collapse API ───────────────────────────────────────────────────────────

  /** Toggle the expanded state of a group item. */
  toggle(id: string): void {
    this._expandedIds.update(current => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  /** Expand a specific item. */
  expand(id: string): void {
    this._expandedIds.update(current => new Set([...current, id]));
  }

  /** Collapse a specific item. */
  collapse(id: string): void {
    this._expandedIds.update(current => {
      const next = new Set(current);
      next.delete(id);
      return next;
    });
  }

  /** Collapse all group items. */
  collapseAll(): void {
    this._expandedIds.set(new Set());
  }

  /** Whether an item is currently expanded. */
  isExpanded(id: string): boolean {
    return this._expandedIds().has(id);
  }

  // ── Private helpers ────────────────────────────────────────────────────────

  private resolveTree(
    items: MenuItem[],
    ancestors: MenuItem[],
    depth: number
  ): ResolvedMenuItem[] {
    const activeUrl = this._activeUrl();
    const expandedIds = this._expandedIds();
    const result: ResolvedMenuItem[] = [];

    for (const item of items) {
      if (item.hidden) continue;

      const isVisible =
        !item.permission || this.permissionService.can(item.permission);

      const isExactActive =
        !!item.routerLink && activeUrl === item.routerLink;

      const resolvedChildren = item.children?.length
        ? this.resolveTree(item.children, [...ancestors, item], depth + 1)
        : [];

      const isActive =
        isExactActive || resolvedChildren.some(c => c.isActive);

      // Auto-expand groups that contain the active route
      if (isActive && item.children?.length && !expandedIds.has(item.id)) {
        // Use update in next tick to avoid signal mutation during computation
        Promise.resolve().then(() => this.expand(item.id));
      }

      const resolved: ResolvedMenuItem = {
        ...item,
        children: resolvedChildren,
        expanded: expandedIds.has(item.id),
        ancestors,
        depth,
        isActive,
        isExactActive,
        isVisible,
      };

      result.push(resolved);
    }

    return result;
  }

  private flatten(items: ResolvedMenuItem[]): ResolvedMenuItem[] {
    const result: ResolvedMenuItem[] = [];
    for (const item of items) {
      result.push(item);
      if (item.children?.length) {
        result.push(...this.flatten(item.children as ResolvedMenuItem[]));
      }
    }
    return result;
  }

  private collectExpandedIds(items: MenuItem[], set: Set<string>): void {
    for (const item of items) {
      if (item.expanded) set.add(item.id);
      if (item.children?.length) this.collectExpandedIds(item.children, set);
    }
  }
}
