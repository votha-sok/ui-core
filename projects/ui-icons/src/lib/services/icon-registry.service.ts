import { Injectable, SecurityContext, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SvgIconEntry } from '../types/icon.types';

@Injectable({ providedIn: 'root' })
export class IconRegistryService {
  private readonly sanitizer = inject(DomSanitizer);

  /**
   * Internal store: icon name → sanitized SafeHtml.
   * We sanitize on registration (not on every render) so the component
   * template binding is pure and fast.
   */
  private readonly registry = new Map<string, SafeHtml>();

  // ── Registration API ───────────────────────────────────────────────────────

  /**
   * Register a single SVG icon by name.
   *
   * The `svg` argument must be a complete `<svg>…</svg>` string.
   * Angular's DomSanitizer strips any unsafe attributes/elements before
   * storing, so it is safe to use `[innerHTML]` with the returned value.
   *
   * @example
   * iconRegistry.register('logo', `<svg viewBox="0 0 24 24">…</svg>`);
   */
  register(name: string, svg: string): void {
    if (!name?.trim()) {
      console.warn('[IconRegistry] register() called with empty name — skipped.');
      return;
    }
    const sanitized = this.sanitizer.sanitize(SecurityContext.HTML, svg);
    if (!sanitized) {
      console.warn(`[IconRegistry] SVG for "${name}" was rejected by DomSanitizer — skipped.`);
      return;
    }
    if (this.registry.has(name)) {
      console.warn(`[IconRegistry] "${name}" is already registered — overwriting.`);
    }
    this.registry.set(name, this.sanitizer.bypassSecurityTrustHtml(sanitized));
  }

  /**
   * Register multiple icons at once.
   * Useful for registering all app icons in a single call during bootstrap.
   *
   * @example
   * iconRegistry.registerAll(APP_ICONS);
   */
  registerAll(entries: SvgIconEntry[]): void {
    for (const entry of entries) {
      this.register(entry.name, entry.svg);
    }
  }

  // ── Lookup API ─────────────────────────────────────────────────────────────

  /**
   * Retrieve a sanitized icon by name.
   * Returns `null` if the name is not in the registry — the component
   * falls back to Material Symbols in this case.
   */
  get(name: string): SafeHtml | null {
    return this.registry.get(name) ?? null;
  }

  /**
   * Check whether a name exists in the SVG registry.
   * Used by the component to choose which render path to take.
   */
  has(name: string): boolean {
    return this.registry.has(name);
  }

  /**
   * List all registered icon names.
   * Useful for debugging or building an icon catalogue in the playground.
   */
  getRegisteredNames(): string[] {
    return Array.from(this.registry.keys()).sort();
  }

  /**
   * Remove a single icon from the registry.
   * Rarely needed but provided for completeness (e.g. lazy-loaded modules
   * that clean up on destroy).
   */
  unregister(name: string): void {
    this.registry.delete(name);
  }
}
