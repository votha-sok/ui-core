import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type SkeletonVariant = 'text' | 'rect' | 'circle';

@Component({
  selector: 'cui-skeleton',
  standalone: true,
  template: '',
  styleUrl: './skeleton.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '"cui-skeleton cui-skeleton--" + variant()',
    '[style.width]':  'width()',
    '[style.height]': 'height()',
    '[attr.aria-hidden]': '"true"',
    '[attr.aria-busy]': '"true"',
  },
})
export class CuiSkeletonComponent {
  readonly variant = input<SkeletonVariant>('text');
  readonly width   = input<string>('100%');
  readonly height  = input<string>('1em');
}
