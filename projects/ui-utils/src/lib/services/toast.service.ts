import { Injectable, computed, signal } from '@angular/core';
import { ToastItem, ToastLevel, ToastOptions, ToastPosition } from '../types/toast.types';

/**
 * ToastService manages the notification queue as a pure state signal.
 * It has no knowledge of the DOM or Angular rendering — the actual overlay
 * component (CuiToastOutletComponent in ui-core) reads this signal and
 * renders the toasts. This keeps ui-utils free of UI dependencies.
 *
 * Usage:
 * ```ts
 * toastService.success('Record saved.');
 * toastService.error('Failed to load data.', { title: 'Error' });
 * toastService.show({ level: 'warning', message: 'Low disk space.', duration: 0 });
 * ```
 */
@Injectable({ providedIn: 'root' })
export class ToastService {
  /** Default duration in ms for auto-dismiss. 0 = manual dismiss only. */
  static readonly DEFAULT_DURATION = 4000;

  /** Default screen position for all toasts. */
  static readonly DEFAULT_POSITION: ToastPosition = 'top-right';

  /** Maximum number of toasts shown simultaneously. Oldest are removed first. */
  static readonly MAX_VISIBLE = 5;

  // ── Internal state ─────────────────────────────────────────────────────────
  private readonly _toasts = signal<ToastItem[]>([]);
  private idCounter = 0;

  // ── Public read-only signals ───────────────────────────────────────────────

  /** The current queue of active toast notifications. */
  readonly toasts = this._toasts.asReadonly();

  /** True when at least one toast is visible. */
  readonly hasToasts = computed(() => this._toasts().length > 0);

  // ── Show API ───────────────────────────────────────────────────────────────

  /**
   * Show a toast with explicit level and full options.
   */
  show(level: ToastLevel, options: ToastOptions): string {
    const id = `toast-${++this.idCounter}`;
    const item: ToastItem = {
      id,
      level,
      message: options.message,
      title: options.title ?? '',
      duration: options.duration ?? ToastService.DEFAULT_DURATION,
      dismissible: options.dismissible ?? true,
      position: options.position ?? ToastService.DEFAULT_POSITION,
      actionLabel: options.actionLabel ?? '',
      onAction: options.onAction,
      createdAt: Date.now(),
    };

    this._toasts.update(current => {
      const next = [...current, item];
      // Trim to max visible — remove oldest first
      return next.length > ToastService.MAX_VISIBLE
        ? next.slice(next.length - ToastService.MAX_VISIBLE)
        : next;
    });

    // Schedule auto-dismiss
    if (item.duration > 0) {
      setTimeout(() => this.dismiss(id), item.duration);
    }

    return id;
  }

  /** Show a success toast. */
  success(message: string, options?: Omit<ToastOptions, 'message'>): string {
    return this.show('success', { message, ...options });
  }

  /** Show an error toast. Longer default duration than others. */
  error(message: string, options?: Omit<ToastOptions, 'message'>): string {
    return this.show('error', {
      message,
      duration: 6000,  // errors need more reading time
      ...options,
    });
  }

  /** Show a warning toast. */
  warning(message: string, options?: Omit<ToastOptions, 'message'>): string {
    return this.show('warning', { message, ...options });
  }

  /** Show an info toast. */
  info(message: string, options?: Omit<ToastOptions, 'message'>): string {
    return this.show('info', { message, ...options });
  }

  // ── Dismiss API ────────────────────────────────────────────────────────────

  /** Dismiss a specific toast by id. */
  dismiss(id: string): void {
    this._toasts.update(current => current.filter(t => t.id !== id));
  }

  /** Dismiss all active toasts. */
  dismissAll(): void {
    this._toasts.set([]);
  }
}
