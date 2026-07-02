import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
const SPIN_SIZE: Record<SpinnerSize, number> = { xs: 14, sm: 18, md: 24, lg: 32, xl: 48 };

@Component({
  selector: 'cui-spinner',
  standalone: true,
  template: `<span class="cui-spinner__track"></span>`,
  styleUrl: './spinner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.width.px]': 'px()',
    '[style.height.px]': 'px()',
    '[attr.role]': '"status"',
    '[attr.aria-label]': 'label()',
    '[attr.aria-live]': '"polite"',
    'style': 'display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;',
  },
})
export class CuiSpinnerComponent {
  readonly size  = input<SpinnerSize>('md');
  readonly color = input<string>('var(--mat-sys-primary)');
  readonly label = input<string>('Loading…');
  readonly px    = computed(() => SPIN_SIZE[this.size()]);
}
