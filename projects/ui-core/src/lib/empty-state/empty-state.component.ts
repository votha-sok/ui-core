import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CuiIconComponent } from 'ui-icons';

@Component({
  selector: 'cui-empty-state',
  standalone: true,
  imports: [CuiIconComponent],
  template: `
    <div class="cui-empty flex flex-col items-center gap-3 py-12 px-6 text-center">
      @if (icon()) {
        <div class="cui-empty__icon-wrap">
          <cui-icon [name]="icon()!" size="xl"
            color="var(--mat-sys-on-surface-variant)" style="opacity:0.4;" />
        </div>
      }
      <div class="flex flex-col gap-1">
        <p class="cui-empty__title font-semibold text-base"
          style="color:var(--mat-sys-on-surface)">{{ title() }}</p>
        @if (description()) {
          <p class="cui-empty__description text-sm"
            style="color:var(--mat-sys-on-surface-variant)">{{ description() }}</p>
        }
      </div>
      <!-- Action slot — consumer places a <cui-button> here -->
      <ng-content select="[cuiEmptyAction]" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CuiEmptyStateComponent {
  readonly icon        = input<string | null>('inbox');
  readonly title       = input<string>('No data');
  readonly description = input<string | null>(null);
}
