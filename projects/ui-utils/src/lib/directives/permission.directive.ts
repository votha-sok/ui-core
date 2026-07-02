import {
  Directive,
  TemplateRef,
  ViewContainerRef,
  inject,
  input,
  effect,
} from '@angular/core';
import { PermissionService } from '../services/permission.service';

/**
 * Structural directive that conditionally renders its host based on the
 * current user's permissions.
 *
 * ## Usage
 *
 * ### Single permission (AND — must have this key):
 * ```html
 * <button *cuiPermission="'users:create'">Create User</button>
 * ```
 *
 * ### Multiple permissions — ALL required (AND logic):
 * ```html
 * <div *cuiPermission="['users:read', 'reports:view']">...</div>
 * ```
 *
 * ### Any one permission sufficient (OR logic):
 * ```html
 * <div *cuiPermission="'users:create'; any: true">...</div>
 * ```
 *
 * ### Else template:
 * ```html
 * <button *cuiPermission="'users:delete'; else noAccess">Delete</button>
 * <ng-template #noAccess>
 *   <span>Insufficient permissions</span>
 * </ng-template>
 * ```
 *
 * ### Invert (hide when the user HAS the permission):
 * ```html
 * <div *cuiPermission="'isGuest'; not: true">Logged-in only content</div>
 * ```
 *
 * ## Notes
 * - Uses structural directive microsyntax — the directive selector is
 *   `[cuiPermission]`, used as `*cuiPermission="..."`.
 * - The view is destroyed (not just hidden) when permission is absent,
 *   consistent with Angular's *ngIf behaviour. This means components inside
 *   the block are fully destroyed, not just invisible — important for
 *   security-sensitive content.
 * - Reactively re-evaluates when PermissionService's signal changes (e.g.
 *   after a role update without re-login).
 */
@Directive({
  selector: '[cuiPermission]',
  standalone: true,
})
export class PermissionDirective {
  private readonly templateRef = inject(TemplateRef<unknown>);
  private readonly viewContainer = inject(ViewContainerRef);
  private readonly permissionService = inject(PermissionService);

  // ── Inputs ─────────────────────────────────────────────────────────────────

  /**
   * The permission key(s) to check.
   * - A single string: checks for that key.
   * - An array of strings: checks all keys (AND) or any key (OR) depending
   *   on the `cuiPermissionAny` input.
   */
  readonly cuiPermission = input.required<string | string[]>();

  /**
   * When true, the check passes if the user has ANY ONE of the keys.
   * When false (default), ALL keys must be present.
   */
  readonly cuiPermissionAny = input<boolean>(false);

  /**
   * Invert the result: show the element when the user does NOT have the
   * permission, hide when they do.
   */
  readonly cuiPermissionNot = input<boolean>(false);

  /**
   * Optional else template rendered when permission is absent (and not
   * inverted). Mirrors Angular's *ngIf else syntax.
   */
  readonly cuiPermissionElse = input<TemplateRef<unknown> | null>(null);

  // ── State ──────────────────────────────────────────────────────────────────

  /** Track whether the main view is currently rendered. */
  private mainViewRendered = false;
  /** Track whether the else view is currently rendered. */
  private elseViewRendered = false;

  // ── Effect ─────────────────────────────────────────────────────────────────

  constructor() {
    /**
     * Re-evaluate whenever permissions change OR any input changes.
     * `effect()` automatically tracks all signals read inside it, including
     * the PermissionService's internal _permissions signal (read via can()).
     */
    effect(() => {
      const keys = this.cuiPermission();
      const any = this.cuiPermissionAny();
      const not = this.cuiPermissionNot();
      const elseTemplate = this.cuiPermissionElse();

      // Check permission
      const keysArray = Array.isArray(keys) ? keys : [keys];
      const hasPermission = any
        ? keysArray.some(k => this.permissionService.can(k))
        : keysArray.every(k => this.permissionService.can(k));

      // Apply inversion
      const shouldShow = not ? !hasPermission : hasPermission;

      this.updateView(shouldShow, elseTemplate);
    });
  }

  // ── Private helpers ────────────────────────────────────────────────────────

  private updateView(
    shouldShow: boolean,
    elseTemplate: TemplateRef<unknown> | null
  ): void {
    if (shouldShow) {
      if (!this.mainViewRendered) {
        this.viewContainer.clear();
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.mainViewRendered = true;
        this.elseViewRendered = false;
      }
    } else {
      if (elseTemplate) {
        if (!this.elseViewRendered) {
          this.viewContainer.clear();
          this.viewContainer.createEmbeddedView(elseTemplate);
          this.elseViewRendered = true;
          this.mainViewRendered = false;
        }
      } else {
        if (this.mainViewRendered || this.elseViewRendered) {
          this.viewContainer.clear();
          this.mainViewRendered = false;
          this.elseViewRendered = false;
        }
      }
    }
  }
}
