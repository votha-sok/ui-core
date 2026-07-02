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
export type ButtonColor    = 'primary' | 'secondary' | 'tertiary' | 'error' | 'neutral';
export type ButtonSize     = 'sm' | 'md' | 'lg';

@Component({
  selector: 'cui-button',
  standalone: true,
  imports: [MatRippleModule, CuiIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClass()',
    '[attr.aria-disabled]': 'isDisabled()',
  },
  template: `
    <button
      [class]="buttonClass()"
      [disabled]="isDisabled()"
      [attr.type]="type()"
      [attr.aria-label]="ariaLabel() || null"
      [attr.aria-busy]="loading() || null"
      matRipple
      [matRippleDisabled]="isDisabled()"
      (click)="!isDisabled() && cuiClick.emit($event)">

      @if (loading()) {
        <cui-icon name="progress_activity" [size]="iconSize()"
          class="cui-btn__spinner" color="currentColor" />
      } @else if (leadingIcon()) {
        <cui-icon [name]="leadingIcon()!" [size]="iconSize()" color="currentColor" />
      }

      @if (!iconOnly()) {
        <span class="cui-btn__label">
          <ng-content />
        </span>
      } @else {
        <ng-content />
      }

      @if (trailingIcon() && !loading()) {
        <cui-icon [name]="trailingIcon()!" [size]="iconSize()" color="currentColor" />
      }
    </button>
  `,
  styles: [`
    :host { display: inline-flex; }

    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      border: none;
      cursor: pointer;
      font-family: inherit;
      font-weight: 500;
      letter-spacing: 0.01em;
      white-space: nowrap;
      transition: background 150ms, box-shadow 150ms, opacity 150ms;
      position: relative;
      overflow: hidden;
      border-radius: var(--cui-radius-md);
      outline-offset: 2px;
      &:focus-visible { outline: 2px solid var(--mat-sys-primary); }
      &:disabled { opacity: 0.38; cursor: not-allowed; }
    }

    /* Sizes */
    .cui-btn--sm  { height: 32px; padding: 0 12px; font-size: 13px; }
    .cui-btn--md  { height: 40px; padding: 0 16px; font-size: 14px; }
    .cui-btn--lg  { height: 48px; padding: 0 24px; font-size: 16px; }
    .cui-btn--icon-only.cui-btn--sm  { padding: 0; width: 32px; }
    .cui-btn--icon-only.cui-btn--md  { padding: 0; width: 40px; }
    .cui-btn--icon-only.cui-btn--lg  { padding: 0; width: 48px; }

    /* Variants × Colors */
    .cui-btn--filled.cui-btn--primary   { background: var(--mat-sys-primary);   color: var(--mat-sys-on-primary); }
    .cui-btn--filled.cui-btn--secondary { background: var(--mat-sys-secondary); color: var(--mat-sys-on-secondary); }
    .cui-btn--filled.cui-btn--tertiary  { background: var(--mat-sys-tertiary);  color: var(--mat-sys-on-tertiary); }
    .cui-btn--filled.cui-btn--error     { background: var(--mat-sys-error);     color: var(--mat-sys-on-error); }
    .cui-btn--filled.cui-btn--neutral   { background: var(--mat-sys-surface-container-high); color: var(--mat-sys-on-surface); }

    .cui-btn--tonal.cui-btn--primary   { background: var(--mat-sys-primary-container);   color: var(--mat-sys-on-primary-container); }
    .cui-btn--tonal.cui-btn--secondary { background: var(--mat-sys-secondary-container); color: var(--mat-sys-on-secondary-container); }
    .cui-btn--tonal.cui-btn--tertiary  { background: var(--mat-sys-tertiary-container);  color: var(--mat-sys-on-tertiary-container); }
    .cui-btn--tonal.cui-btn--error     { background: var(--mat-sys-error-container);     color: var(--mat-sys-on-error-container); }
    .cui-btn--tonal.cui-btn--neutral   { background: var(--mat-sys-surface-container);   color: var(--mat-sys-on-surface); }

    .cui-btn--outlined { background: transparent; border: 1px solid var(--mat-sys-outline); color: var(--mat-sys-on-surface); }
    .cui-btn--outlined.cui-btn--primary   { border-color: var(--mat-sys-primary);   color: var(--mat-sys-primary); }
    .cui-btn--outlined.cui-btn--secondary { border-color: var(--mat-sys-secondary); color: var(--mat-sys-secondary); }
    .cui-btn--outlined.cui-btn--tertiary  { border-color: var(--mat-sys-tertiary);  color: var(--mat-sys-tertiary); }
    .cui-btn--outlined.cui-btn--error     { border-color: var(--mat-sys-error);     color: var(--mat-sys-error); }

    .cui-btn--text { background: transparent; color: var(--mat-sys-primary); }
    .cui-btn--text.cui-btn--secondary { color: var(--mat-sys-secondary); }
    .cui-btn--text.cui-btn--tertiary  { color: var(--mat-sys-tertiary); }
    .cui-btn--text.cui-btn--error     { color: var(--mat-sys-error); }
    .cui-btn--text.cui-btn--neutral   { color: var(--mat-sys-on-surface); }

    .cui-btn--elevated {
      background: var(--mat-sys-surface-container-low);
      color: var(--mat-sys-primary);
      box-shadow: var(--cui-shadow-sm);
    }

    /* Spinner animation */
    .cui-btn__spinner { animation: cui-spin 0.8s linear infinite; }
    @keyframes cui-spin { to { transform: rotate(360deg); } }
  `],
})
export class CuiButtonComponent {
  readonly variant     = input<ButtonVariant>('filled');
  readonly color       = input<ButtonColor>('primary');
  readonly size        = input<ButtonSize>('md');
  readonly loading     = input<boolean>(false);
  readonly disabled    = input<boolean>(false);
  readonly leadingIcon = input<string | null>(null);
  readonly trailingIcon= input<string | null>(null);
  readonly iconOnly    = input<boolean>(false);
  readonly type        = input<'button' | 'submit' | 'reset'>('button');
  readonly ariaLabel   = input<string | null>(null);

  readonly cuiClick = output<MouseEvent>();

  readonly isDisabled = computed(() => this.disabled() || this.loading());

  readonly iconSize = computed(() =>
    this.size() === 'sm' ? 'xs' as const :
    this.size() === 'lg' ? 'md' as const : 'sm' as const
  );

  readonly buttonClass = computed(() => [
    `cui-btn--${this.variant()}`,
    `cui-btn--${this.color()}`,
    `cui-btn--${this.size()}`,
    this.iconOnly() ? 'cui-btn--icon-only' : '',
  ].filter(Boolean).join(' '));

  readonly hostClass = computed(() => '');
}
