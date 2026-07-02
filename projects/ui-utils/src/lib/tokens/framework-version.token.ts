import { InjectionToken } from '@angular/core';

/**
 * The published version of the company-ui framework.
 * Injectable so consuming apps and internal components can display
 * or log which framework version is active, without a hard import
 * that would break tree-shaking.
 */
export const FRAMEWORK_VERSION = new InjectionToken<string>('FRAMEWORK_VERSION', {
  providedIn: 'root',
  factory: () => '0.0.0',
});
