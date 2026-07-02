import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { IconRegistryService } from '../../services/icon-registry.service';
import { CUI_ICON_DEFAULT_VARIANT } from '../../tokens/icon.tokens';
import {
  ICON_SIZE_MAP,
  IconSize,
  IconSource,
  MaterialSymbolVariant,
} from '../../types/icon.types';

@Component({
  selector: 'cui-icon',
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    // Inline-flex so the icon sits correctly in text flows and flex rows
    // without the consumer needing to style the host element.
    '[style.display]': '"inline-flex"',
    '[style.align-items]': '"center"',
    '[style.justify-content]': '"center"',
    '[style.width.px]': 'resolvedSize()',
    '[style.height.px]': 'resolvedSize()',
    // Accessibility: treat the host as an image when a label is provided,
    // or as decorative (hidden from AT) when no label is given.
    '[attr.role]': 'label() ? "img" : null',
    '[attr.aria-label]': 'label() ?? null',
    '[attr.aria-hidden]': 'label() ? null : "true"',
  },
})
export class CuiIconComponent {
  private readonly registry = inject(IconRegistryService);
  private readonly defaultVariant = inject(CUI_ICON_DEFAULT_VARIANT);

  // ── Inputs ─────────────────────────────────────────────────────────────────

  /**
   * The icon name.
   * - If registered in the SVG registry → renders as inline SVG.
   * - Otherwise → renders as a Material Symbols ligature.
   *
   * @example <cui-icon name="home" />
   * @example <cui-icon name="company-logo" />  ← custom SVG registered at bootstrap
   */
  readonly name = input.required<string>();

  /**
   * Named size from the shared scale.
   * @default 'md' (24px)
   */
  readonly size = input<IconSize>('md');

  /**
   * Material Symbols font variant.
   * Only used when rendering via Material Symbols (not custom SVG).
   * Defaults to the value of CUI_ICON_DEFAULT_VARIANT ('outlined').
   */
  readonly variant = input<MaterialSymbolVariant | null>(null);

  /**
   * Optional colour override.
   * When omitted the icon inherits `currentColor` from the parent element,
   * which is the correct default for icon usage inside buttons, labels, etc.
   *
   * @example <cui-icon name="home" color="var(--mat-sys-primary)" />
   */
  readonly color = input<string | null>(null);

  /**
   * Accessible label.
   * When provided, `role="img"` and `aria-label` are set on the host.
   * When omitted, `aria-hidden="true"` is set — correct for decorative icons
   * that sit next to visible text.
   *
   * @example <cui-icon name="delete" label="Delete item" />
   */
  readonly label = input<string | null>(null);

  // ── Derived signals ────────────────────────────────────────────────────────

  /** Resolved pixel size for the current size input. */
  readonly resolvedSize = computed<number>(() => ICON_SIZE_MAP[this.size()]);

  /** Which render path to use. */
  readonly source = computed<IconSource>(() =>
    this.registry.has(this.name()) ? 'svg' : 'material-symbol'
  );

  /** Sanitized SVG markup — only defined when source is 'svg'. */
  readonly svgContent = computed<SafeHtml | null>(() =>
    this.source() === 'svg' ? this.registry.get(this.name()) : null
  );

  /** The Material Symbols CSS class to apply. */
  readonly materialSymbolClass = computed<string>(() => {
    const v = this.variant() ?? this.defaultVariant;
    return `material-symbols-${v}`;
  });

  /** Resolved colour — falls back to currentColor (inherits from parent). */
  readonly resolvedColor = computed<string>(() => this.color() ?? 'currentColor');
}
