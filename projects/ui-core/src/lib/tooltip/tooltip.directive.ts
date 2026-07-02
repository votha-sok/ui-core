import { Directive, ElementRef, OnDestroy, OnInit, inject, input } from '@angular/core';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';

export type TooltipPosition = 'above' | 'below' | 'left' | 'right';

/**
 * Attribute directive that wraps MatTooltip with sensible defaults
 * and the company-ui design token class.
 *
 * Usage:
 * ```html
 * <button cuiTooltip="Save changes">Save</button>
 * <button cuiTooltip="Permanently delete" cuiTooltipPosition="above">Delete</button>
 * ```
 */
@Directive({
  selector: '[cuiTooltip]',
  standalone: true,
  hostDirectives: [
    {
      directive: MatTooltip,
      inputs: ['matTooltipDisabled: cuiTooltipDisabled'],
    },
  ],
})
export class CuiTooltipDirective implements OnInit {
  private readonly matTooltip = inject(MatTooltip);

  readonly cuiTooltip         = input.required<string>();
  readonly cuiTooltipPosition = input<TooltipPosition>('below');
  readonly cuiTooltipDisabled = input<boolean>(false);

  ngOnInit(): void {
    this.matTooltip.message       = this.cuiTooltip();
    this.matTooltip.position      = this.cuiTooltipPosition();
    this.matTooltip.tooltipClass  = 'cui-tooltip';
    this.matTooltip.showDelay     = 300;
    this.matTooltip.hideDelay     = 0;
  }
}
