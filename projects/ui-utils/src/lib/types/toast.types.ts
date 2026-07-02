/** Semantic level that determines the toast's colour and icon. */
export type ToastLevel = 'success' | 'error' | 'warning' | 'info';

/** Screen position of the toast container. */
export type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'top-center'
  | 'bottom-right'
  | 'bottom-left'
  | 'bottom-center';

/** Options accepted by ToastService.show() and its shorthand methods. */
export interface ToastOptions {
  /** Main message. Required. */
  message: string;
  /** Optional heading displayed above the message in bold. */
  title?: string;
  /** Auto-dismiss delay in milliseconds. Set to 0 to disable auto-dismiss. */
  duration?: number;
  /** Whether to show a manual close button. Defaults to true. */
  dismissible?: boolean;
  /** Screen position. Defaults to the service-level default ('top-right'). */
  position?: ToastPosition;
  /** Optional action button label. */
  actionLabel?: string;
  /** Callback invoked when the user clicks the action button. */
  onAction?: () => void;
}

/** A toast notification in the active queue. */
export interface ToastItem extends Required<Omit<ToastOptions, 'onAction'>> {
  id: string;
  level: ToastLevel;
  onAction?: () => void;
  /** Timestamp when this toast was added — used to order the queue. */
  createdAt: number;
}
