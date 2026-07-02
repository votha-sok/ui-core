import {
  Injectable,
  Type,
  inject,
  signal,
} from '@angular/core';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { Observable, Subject } from 'rxjs';
import { CuiDialogRef, DialogConfig, DIALOG_DATA } from '../types/dialog.types';

/**
 * DialogService wraps Angular CDK's `Dialog` with a typed, signal-friendly API.
 * CDK Dialog gives us full control over panel styles and animation without
 * inheriting Material's dialog CSS.
 */
@Injectable({ providedIn: 'root' })
export class DialogService {
  private readonly cdkDialog = inject(Dialog);

  /**
   * Open a dialog component.
   * @param component The standalone component to render inside the dialog.
   * @param config    Optional sizing, data, and behaviour config.
   * @returns         CuiDialogRef with close(), result signal, and closed$ observable.
   */
  open<TData = unknown, TResult = unknown>(
    component: Type<unknown>,
    config?: DialogConfig<TData>
  ): CuiDialogRef<TResult> {
    const resultSignal = signal<TResult | undefined>(undefined);
    const resultSubject = new Subject<TResult | undefined>();

    const cdkRef: DialogRef<TResult> = this.cdkDialog.open<TResult>(component, {
      width: config?.width ?? '480px',
      maxWidth: config?.maxWidth ?? '90vw',
      maxHeight: config?.maxHeight ?? '90vh',
      disableClose: !(config?.closeOnBackdropClick ?? true),
      closeOnNavigation: true,
      ariaLabel: config?.ariaLabel,
      panelClass: [
        'cui-dialog-panel',
        ...(Array.isArray(config?.panelClass)
          ? config.panelClass
          : config?.panelClass
          ? [config.panelClass]
          : []),
      ],
      // Provide dialog data via the DIALOG_DATA token
      providers: config?.data !== undefined
        ? [{ provide: DIALOG_DATA, useValue: config.data }]
        : [],
    });

    // CDK v22: keydownEvents is a plain Observable property, not a method
    if (config?.closeOnEscape !== false) {
      cdkRef.keydownEvents.subscribe((e: KeyboardEvent) => {
        if (e.key === 'Escape') cdkRef.close();
      });
    }

    cdkRef.closed.subscribe((result: TResult | undefined) => {
      resultSignal.set(result);
      resultSubject.next(result);
      resultSubject.complete();
    });

    return {
      close: (result?: TResult) => cdkRef.close(result),
      result: resultSignal.asReadonly(),
      closed$: resultSubject.asObservable() as Observable<TResult | undefined>,
    };
  }

  /** Close all currently open dialogs. */
  closeAll(): void {
    this.cdkDialog.openDialogs.forEach(d => d.close());
  }
}
