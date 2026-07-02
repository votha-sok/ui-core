import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { CuiIconComponent } from 'ui-icons';

export type ButtonVariant = 'filled' | 'outlined' | 'text' | 'elevated' | 'tonal';
export type ButtonSize    = 'sm' | 'md' | 'lg';
export type ButtonColor   = 'primary' | 'secondary' | 'tertiary' | 'error' | 'neutral';

@Component({
  selector: 'cui-button',
  standalone: true,
  imports: [MatRippleModule, CuiIconComponent],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClass()',
    '[attr.aria-disabled]': 'disabled() || loading() ? "true" : null',
    '[attr.role]': '"button"',
    '[attr.tabindex]': 'disabled() || loading() ? "-1" : "0"',
    '(keydown.enter)': 'handleKeydown($event)',
    '(keydown.space)': 'handleKeydown($event)',
  },
})
export class CuiButtonComponent {
  // ── Inputs ─────────────────────────────────────────────────────────────────
  readonly variant  = input<ButtonVariant>('filled');
  readonly size     = input<ButtonSize>('md');
  readonly color    = input<ButtonColor>('primary');
  readonly disabled = input<boolean>(false);
  readonly loading  = input<boolean>(false);
  readonly fullWidth = input<boolean>(false);
  readonly iconLeft  = input<string | null>(null);
  readonly iconRight = input<string | null>(null);
  readonly type      = input<'button' | 'submit' | 'reset'>('button');

  // ── Outputs ────────────────────────────────────────────────────────────────
  readonly cuiClick = output<MouseEvent>();

  // ── Derived ────────────────────────────────────────────────────────────────
  readonly hostClass = computed(() => {
    const parts = [
      'cui-btn',
      `cui-btn--${this.variant()}`,
      `cui-btn--${this.size()}`,
      `cui-btn--${this.color()}`,
    ];
    if (this.disabled() || this.loading()) parts.push('cui-btn--disabled');
    if (this.loading()) parts.push('cui-btn--loading');
    if (this.fullWidth()) parts.push('cui-btn--full');
    return parts.join(' ');
  });

  readonly iconSize = computed(() =>
    this.size() === 'sm' ? 'xs' as const : this.size() === 'lg' ? 'md' as const : 'sm' as const
  );

  handleClick(e: MouseEvent): void {
    if (this.disabled() || this.loading()) { e.stopPropagation(); return; }
    this.cuiClick.emit(e);
  }

  handleKeydown(e: Event): void {
    if (this.disabled() || this.loading()) return;
    e.preventDefault();
    (e.target as HTMLElement).click();
  }
}
