import {
  ChangeDetectionStrategy, Component, computed, input, output,
} from '@angular/core';
import { CuiIconComponent } from 'ui-icons';

export type ChipVariant = 'filled' | 'outlined' | 'soft';
export type ChipColor   = 'primary' | 'secondary' | 'tertiary' | 'error' | 'success' | 'warning' | 'neutral';

@Component({
  selector: 'cui-chip',
  standalone: true,
  imports: [CuiIconComponent],
  templateUrl: './chip.component.html',
  styleUrl: './chip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClass()',
    '[attr.role]': 'selectable() ? "option" : "listitem"',
    '[attr.aria-selected]': 'selectable() ? selected() : null',
    '[attr.tabindex]': 'disabled() ? "-1" : "0"',
    '(click)': 'onClick()',
    '(keydown.enter)': 'onClick()',
    '(keydown.space)': '$event.preventDefault(); onClick()',
  },
})
export class CuiChipComponent {
  readonly variant    = input<ChipVariant>('soft');
  readonly color      = input<ChipColor>('neutral');
  readonly selected   = input<boolean>(false);
  readonly selectable = input<boolean>(false);
  readonly dismissible = input<boolean>(false);
  readonly disabled   = input<boolean>(false);
  readonly icon       = input<string | null>(null);

  readonly dismissed = output<void>();
  readonly selectedChange = output<boolean>();

  readonly hostClass = computed(() =>
    ['cui-chip',
      `cui-chip--${this.variant()}`,
      `cui-chip--${this.color()}`,
      this.selected()  ? 'cui-chip--selected'  : '',
      this.disabled()  ? 'cui-chip--disabled'  : '',
      this.selectable() ? 'cui-chip--selectable' : '',
    ].filter(Boolean).join(' ')
  );

  onClick(): void {
    if (this.disabled()) return;
    if (this.selectable()) this.selectedChange.emit(!this.selected());
  }

  onDismiss(e: Event): void {
    e.stopPropagation();
    if (!this.disabled()) this.dismissed.emit();
  }
}
