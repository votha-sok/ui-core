import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type BadgeVariant = 'filled' | 'outlined' | 'soft';
export type BadgeColor   = 'primary' | 'secondary' | 'tertiary' | 'error' | 'warning' | 'success' | 'neutral';
export type BadgeSize    = 'sm' | 'md' | 'lg';

@Component({
  selector: 'cui-badge',
  standalone: true,
  template: `
    <span class="cui-badge__dot" *ngIf="dot()" aria-hidden="true"></span>
    @if (!dot()) { <ng-content /> }
  `,
  styleUrl: './badge.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClass()',
    '[attr.aria-label]': 'ariaLabel()',
  },
})
export class CuiBadgeComponent {
  readonly variant  = input<BadgeVariant>('soft');
  readonly color    = input<BadgeColor>('primary');
  readonly size     = input<BadgeSize>('md');
  /** When true renders as a small dot with no text content. */
  readonly dot      = input<boolean>(false);
  readonly ariaLabel = input<string | null>(null);

  readonly hostClass = computed(() =>
    `cui-badge cui-badge--${this.variant()} cui-badge--${this.color()} cui-badge--${this.size()}${this.dot() ? ' cui-badge--dot' : ''}`
  );
}
