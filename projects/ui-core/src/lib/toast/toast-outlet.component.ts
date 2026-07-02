import {
  ChangeDetectionStrategy, Component, computed, inject,
} from '@angular/core';
import { ToastService, ToastItem, ToastPosition } from 'ui-utils';
import { CuiIconComponent } from 'ui-icons';

const POSITION_CLASSES: Record<ToastPosition, string> = {
  'top-right':     'top-4 right-4 items-end',
  'top-left':      'top-4 left-4 items-start',
  'top-center':    'top-4 left-1/2 -translate-x-1/2 items-center',
  'bottom-right':  'bottom-4 right-4 items-end',
  'bottom-left':   'bottom-4 left-4 items-start',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2 items-center',
};

const TOAST_ICONS: Record<string, string> = {
  success: 'check_circle',
  error:   'error',
  warning: 'warning',
  info:    'info',
};

@Component({
  selector: 'cui-toast-outlet',
  standalone: true,
  imports: [CuiIconComponent],
  templateUrl: './toast-outlet.component.html',
  styleUrl: './toast-outlet.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CuiToastOutletComponent {
  readonly toastService = inject(ToastService);

  /** Group toasts by position so we can render separate stacks. */
  readonly positions: ToastPosition[] = [
    'top-right', 'top-left', 'top-center',
    'bottom-right', 'bottom-left', 'bottom-center',
  ];

  toastsForPosition(pos: ToastPosition): ToastItem[] {
    return this.toastService.toasts().filter(t => t.position === pos);
  }

  positionClass(pos: ToastPosition): string {
    return POSITION_CLASSES[pos];
  }

  iconFor(level: string): string {
    return TOAST_ICONS[level] ?? 'info';
  }

  dismiss(id: string): void {
    this.toastService.dismiss(id);
  }
}
