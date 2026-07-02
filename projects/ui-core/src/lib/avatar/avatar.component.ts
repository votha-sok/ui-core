import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
} from '@angular/core';
import { CuiBadgeComponent } from '../badge/badge.component';

export type AvatarSize   = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarStatus = 'online' | 'offline' | 'away' | 'busy' | null;
export type AvatarShape  = 'circle' | 'rounded' | 'square';

const SIZE_PX: Record<AvatarSize, number> = { xs: 24, sm: 32, md: 40, lg: 48, xl: 64 };

@Component({
  selector: 'cui-avatar',
  standalone: true,
  imports: [CuiBadgeComponent],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClass()',
    '[style.width.px]': 'sizePx()',
    '[style.height.px]': 'sizePx()',
    '[attr.aria-label]': 'ariaLabel() ?? name() ?? null',
    '[attr.role]': '"img"',
  },
})
export class CuiAvatarComponent {
  readonly src    = input<string | null>(null);
  readonly name   = input<string | null>(null);
  readonly size   = input<AvatarSize>('md');
  readonly shape  = input<AvatarShape>('circle');
  readonly status = input<AvatarStatus>(null);
  readonly ariaLabel = input<string | null>(null);

  /** Set to true on image error — shows initials fallback. */
  readonly imgError = signal(false);

  readonly sizePx    = computed(() => SIZE_PX[this.size()]);
  readonly fontSize  = computed(() => Math.round(SIZE_PX[this.size()] * 0.36));
  readonly initials  = computed(() => {
    const n = this.name();
    if (!n) return '?';
    return n.split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase();
  });
  readonly showImage = computed(() => !!this.src() && !this.imgError());

  readonly hostClass = computed(() =>
    `cui-avatar cui-avatar--${this.size()} cui-avatar--${this.shape()}`
  );

  readonly statusColor = computed(() => {
    switch (this.status()) {
      case 'online':  return '#22c55e';
      case 'away':    return '#f59e0b';
      case 'busy':    return 'var(--mat-sys-error)';
      case 'offline': return 'var(--mat-sys-outline)';
      default:        return null;
    }
  });

  onImgError(): void { this.imgError.set(true); }
}
