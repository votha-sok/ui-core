import { InjectionToken, Signal } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Token to inject dialog data into a dialog component.
 * Provide the concrete type via: InjectionToken<YourType>
 *
 * @example
 * // In the dialog component:
 * readonly data = inject<MyDialogData>(DIALOG_DATA);
 */
export const DIALOG_DATA = new InjectionToken<unknown>('DIALOG_DATA');

/** Config passed to DialogService.open(). */
export interface DialogConfig<TData = unknown> {
  /** Data injected into the dialog component via DIALOG_DATA. */
  data?: TData;
  /** Panel width. Defaults to '480px'. */
  width?: string;
  /** Panel max-width. Defaults to '90vw'. */
  maxWidth?: string;
  /** Panel max-height. Defaults to '90vh'. */
  maxHeight?: string;
  /** Whether clicking the backdrop closes the dialog. Defaults to true. */
  closeOnBackdropClick?: boolean;
  /** Whether Escape closes the dialog. Defaults to true. */
  closeOnEscape?: boolean;
  /** Additional CSS classes on the dialog panel element. */
  panelClass?: string | string[];
  /** ARIA label for accessibility. */
  ariaLabel?: string;
}

/**
 * Reference to an open dialog returned by DialogService.open().
 */
export interface CuiDialogRef<TResult = unknown> {
  /** Close the dialog, optionally passing a result value. */
  close(result?: TResult): void;
  /** Signal that holds the dialog result after it closes. */
  result: Signal<TResult | undefined>;
  /** RxJS Observable equivalent of result — completes after emitting once. */
  closed$: Observable<TResult | undefined>;
}
