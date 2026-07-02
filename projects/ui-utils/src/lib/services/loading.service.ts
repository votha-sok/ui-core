import { Injectable, computed, signal } from '@angular/core';

/**
 * The global scope name. Used for app-wide loading overlay.
 * Prefer named scopes for section-level loading (e.g. 'user-table').
 */
export const GLOBAL_LOADING_SCOPE = '__global__';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  /**
   * Active loading scopes — a set of scope names currently loading.
   * Using a Set prevents double-counting if the same scope is started twice.
   */
  private readonly _activeScopes = signal<Set<string>>(new Set());

  // ── Global loading signals ─────────────────────────────────────────────────

  /**
   * True when the global loading scope is active.
   * Use this to show a full-page loading overlay.
   */
  readonly isLoading = computed(() =>
    this._activeScopes().has(GLOBAL_LOADING_SCOPE)
  );

  /**
   * True when ANY scope (including global) is loading.
   * Useful for disabling the page nav while any request is in flight.
   */
  readonly isAnyLoading = computed(() => this._activeScopes().size > 0);

  /**
   * The set of all currently active scope names.
   * Useful for debugging or building granular loading indicators.
   */
  readonly activeScopes = this._activeScopes.asReadonly();

  // ── Start / stop API ───────────────────────────────────────────────────────

  /**
   * Start loading for a scope.
   * @param scope Defaults to the global scope.
   *
   * @example
   * loadingService.start();               // global
   * loadingService.start('user-table');   // scoped
   */
  start(scope: string = GLOBAL_LOADING_SCOPE): void {
    this._activeScopes.update(s => new Set([...s, scope]));
  }

  /**
   * Stop loading for a scope.
   * Has no effect if the scope is not currently active.
   */
  stop(scope: string = GLOBAL_LOADING_SCOPE): void {
    this._activeScopes.update(s => {
      const next = new Set(s);
      next.delete(scope);
      return next;
    });
  }

  /**
   * Stop ALL active scopes simultaneously.
   * Useful as a safety net in error handlers.
   */
  stopAll(): void {
    this._activeScopes.set(new Set());
  }

  /**
   * Whether a specific named scope is currently loading.
   * Returns a plain boolean — wrap in a computed() in components if you
   * need reactive re-evaluation.
   *
   * @example
   * // In a component:
   * isTableLoading = computed(() => this.loadingService.isScopeLoading('user-table'));
   */
  isScopeLoading(scope: string): boolean {
    return this._activeScopes().has(scope);
  }

  /**
   * Wrap an async operation with automatic start/stop.
   * Ensures loading is always stopped even if the operation throws.
   *
   * @example
   * const users = await loadingService.track(() => this.userApi.getAll(), 'user-table');
   */
  async track<T>(
    fn: () => Promise<T>,
    scope: string = GLOBAL_LOADING_SCOPE
  ): Promise<T> {
    this.start(scope);
    try {
      return await fn();
    } finally {
      this.stop(scope);
    }
  }
}
