import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type ProgressColor = 'primary' | 'secondary' | 'tertiary' | 'error' | 'success' | 'warning';

@Component({
  selector: 'cui-progress',
  standalone: true,
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'role': 'progressbar',
    '[attr.aria-valuenow]':  'indeterminate() ? null : value()',
    '[attr.aria-valuemin]':  '0',
    '[attr.aria-valuemax]':  'max()',
    '[attr.aria-label]':     'label()',
    '[attr.aria-valuetext]': 'indeterminate() ? "Loading" : value() + "%"',
    '[class]': '"cui-progress cui-progress--" + color()',
  },
})
export class CuiProgressComponent {
  readonly value         = input<number>(0);
  readonly max           = input<number>(100);
  readonly indeterminate = input<boolean>(false);
  readonly color         = input<ProgressColor>('primary');
  readonly label         = input<string>('Progress');
  readonly showLabel     = input<boolean>(false);
  readonly striped       = input<boolean>(false);
  readonly height        = input<string>('6px');

  readonly pct = computed(() =>
    Math.min(100, Math.max(0, (this.value() / this.max()) * 100))
  );
}
