import { InjectionToken } from '@angular/core';
import { MaterialSymbolVariant } from '../types/icon.types';

/**
 * Default Material Symbols font variant used by every <cui-icon> that
 * doesn't specify a variant explicitly.
 *
 * Override at the application level via:
 *   providers: [
 *     { provide: CUI_ICON_DEFAULT_VARIANT, useValue: 'rounded' }
 *   ]
 */
export const CUI_ICON_DEFAULT_VARIANT =
  new InjectionToken<MaterialSymbolVariant>('CUI_ICON_DEFAULT_VARIANT', {
    providedIn: 'root',
    factory: () => 'outlined',
  });
