import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PermissionService {
  /**
   * The set of permission keys held by the currently authenticated user.
   * Populated by the consuming app after login, cleared on logout.
   *
   * Permission keys are arbitrary strings — use whatever convention your
   * backend uses (e.g. 'users.create', 'ROLE_ADMIN', 'reports:view').
   */
  private readonly _permissions = signal<ReadonlySet<string>>(new Set());

  /** Read-only view of the current permission set. */
  readonly permissions = this._permissions.asReadonly();

  /**
   * Whether the current user has all of the specified permissions.
   * Returns a computed signal so components re-evaluate reactively
   * when the permission set changes (e.g. after a role update).
   *
   * @example
   * // In a component:
   * canCreate = permissionService.hasAll('users.create');
   * // In a template:
   * @if (canCreate()) { <button>Create</button> }
   */
  hasAll(...keys: string[]): import('@angular/core').Signal<boolean> {
    return computed(() => {
      const perms = this._permissions();
      return keys.every(k => perms.has(k));
    });
  }

  /**
   * Whether the current user has at least one of the specified permissions.
   */
  hasAny(...keys: string[]): import('@angular/core').Signal<boolean> {
    return computed(() => {
      const perms = this._permissions();
      return keys.some(k => perms.has(k));
    });
  }

  /**
   * Synchronous check — useful in guards and service logic where a signal
   * cannot be read reactively.
   */
  can(key: string): boolean {
    return this._permissions().has(key);
  }

  // ── Mutation API (called by the consuming app, not by components) ──────────

  /**
   * Replace the entire permission set. Call this after login/token refresh.
   *
   * @example
   * permissionService.setPermissions(['users.read', 'users.create', 'reports.view']);
   */
  setPermissions(keys: string[]): void {
    this._permissions.set(new Set(keys));
  }

  /**
   * Add individual permissions without replacing the entire set.
   * Useful when permissions are loaded incrementally.
   */
  addPermissions(...keys: string[]): void {
    this._permissions.update(current => new Set([...current, ...keys]));
  }

  /**
   * Remove specific permissions. Useful when a role is revoked without
   * a full re-login.
   */
  removePermissions(...keys: string[]): void {
    this._permissions.update(current => {
      const next = new Set(current);
      keys.forEach(k => next.delete(k));
      return next;
    });
  }

  /**
   * Clear all permissions. Call this on logout.
   */
  clearPermissions(): void {
    this._permissions.set(new Set());
  }
}
