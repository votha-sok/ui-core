import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type BadgeVariant = 'filled' | 'outlined' | 'soft';
export type BadgeColor   = 'primary' | 'secondary' | 'tertiary' | 'error' | 'warning' | 'success' | 'neutral';
export type BadgeSize    = 'sm' | 'md' | 'lg';

@Component({
  selector: 'cui-badge',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClass()',
    '[attr.aria-label]': 'ariaLabel() || null',
    role: 'status',
  },
  template: `
    @if (dot()) {
      <span class="cui-badge__dot"></span>
    } @else {
      <ng-content />
    }
  `,
  styles: [`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-family: inherit;
      font-weight: 500;
      white-space: nowrap;
      border-radius: 999px;
      line-height: 1;
    }

    /* Sizes */
    :host.cui-badge--sm { font-size: 11px; padding: 2px 6px;  min-width: 18px; height: 18px; }
    :host.cui-badge--md { font-size: 12px; padding: 3px 8px;  min-width: 22px; height: 22px; }
    :host.cui-badge--lg { font-size: 13px; padding: 4px 10px; min-width: 26px; height: 26px; }

    /* Dot override */
    :host .cui-badge__dot {
      width: 8px; height: 8px; border-radius: 50%;
      background: currentColor; display: block;
    }
    :host.cui-badge--sm .cui-badge__dot { width: 6px; height: 6px; }
    :host.cui-badge--lg .cui-badge__dot { width: 10px; height: 10px; }

    /* Filled */
    :host.cui-badge--filled.cui-badge--primary   { background: var(--mat-sys-primary);   color: var(--mat-sys-on-primary); }
    :host.cui-badge--filled.cui-badge--secondary { background: var(--mat-sys-secondary); color: var(--mat-sys-on-secondary); }
    :host.cui-badge--filled.cui-badge--tertiary  { background: var(--mat-sys-tertiary);  color: var(--mat-sys-on-tertiary); }
    :host.cui-badge--filled.cui-badge--error     { background: var(--mat-sys-error);     color: var(--mat-sys-on-error); }
    :host.cui-badge--filled.cui-badge--warning   { background: #f59e0b; color: #1c1917; }
    :host.cui-badge--filled.cui-badge--success   { background: #10b981; color: #fff; }
    :host.cui-badge--filled.cui-badge--neutral   { background: var(--mat-sys-surface-container-highest); color: var(--mat-sys-on-surface); }

    /* Soft */
    :host.cui-badge--soft.cui-badge--primary   { background: var(--mat-sys-primary-container);   color: var(--mat-sys-on-primary-container); }
    :host.cui-badge--soft.cui-badge--secondary { background: var(--mat-sys-secondary-container); color: var(--mat-sys-on-secondary-container); }
    :host.cui-badge--soft.cui-badge--tertiary  { background: var(--mat-sys-tertiary-container);  color: var(--mat-sys-on-tertiary-container); }
    :host.cui-badge--soft.cui-badge--error     { background: var(--mat-sys-error-container);     color: var(--mat-sys-on-error-container); }
    :host.cui-badge--soft.cui-badge--warning   { background: #fef3c7; color: #92400e; }
    :host.cui-badge--soft.cui-badge--success   { background: #d1fae5; color: #065f46; }
    :host.cui-badge--soft.cui-badge--neutral   { background: var(--mat-sys-surface-container);   color: var(--mat-sys-on-surface-variant); }

    /* Outlined */
    :host.cui-badge--outlined { background: transparent; border: 1px solid currentColor; }
    :host.cui-badge--outlined.cui-badge--primary   { color: var(--mat-sys-primary); }
    :host.cui-badge--outlined.cui-badge--secondary { color: var(--mat-sys-secondary); }
    :host.cui-badge--outlined.cui-badge--tertiary  { color: var(--mat-sys-tertiary); }
    :host.cui-badge--outlined.cui-badge--error     { color: var(--mat-sys-error); }
    :host.cui-badge--outlined.cui-badge--warning   { color: #b45309; }
    :host.cui-badge--outlined.cui-badge--success   { color: #059669; }
    :host.cui-badge--outlined.cui-badge--neutral   { color: var(--mat-sys-on-surface-variant); border-color: var(--mat-sys-outline); }
  `],
})
export class CuiBadgeComponent {
  readonly variant  = input<BadgeVariant>('soft');
  readonly color    = input<BadgeColor>('primary');
  readonly size     = input<BadgeSize>('md');
  readonly dot      = input<boolean>(false);
  readonly ariaLabel= input<string | null>(null);

  readonly hostClass = computed(() => [
    'cui-badge',
    `cui-badge--${this.variant()}`,
    `cui-badge--${this.color()}`,
    `cui-badge--${this.size()}`,
  ].join(' '));
}
