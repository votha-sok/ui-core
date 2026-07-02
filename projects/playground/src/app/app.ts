import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

import { FRAMEWORK_VERSION } from 'ui-utils';
import { ThemeService } from 'ui-theme';
import { CuiIconComponent, IconRegistryService } from 'ui-icons';
import {
  MenuService, MenuItem, ToastService, LoadingService, PermissionService,
} from 'ui-utils';
import {
  CuiButtonComponent,
  CuiBadgeComponent,
  CuiAvatarComponent,
  CuiSpinnerComponent,
  CuiSkeletonComponent,
  CuiProgressComponent,
  CuiChipComponent,
  CuiTooltipDirective,
  CuiToastOutletComponent,
  CuiLoadingOverlayComponent,
  CuiEmptyStateComponent,
} from 'ui-core';

const CUSTOM_ICONS = [
  { name: 'shield', svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 4l6 2.67V11c0 3.87-2.64 7.5-6 8.93C8.64 18.5 6 14.87 6 11V7.67L12 5z"/></svg>` },
  { name: 'aml-flag', svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6h-5.6z"/></svg>` },
  { name: 'company-logo', svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="currentColor"><rect x="4" y="4" width="14" height="14" rx="2"/><rect x="22" y="4" width="14" height="14" rx="2" opacity="0.6"/><rect x="4" y="22" width="14" height="14" rx="2" opacity="0.6"/><rect x="22" y="22" width="14" height="14" rx="2" opacity="0.3"/></svg>` },
];

const APP_MENU: MenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', routerLink: '/' },
  { id: 'monitoring', label: 'Monitoring', icon: 'radar', children: [
    { id: 'alerts', label: 'Alerts', icon: 'aml-flag', routerLink: '/alerts', badge: '12', badgeColor: 'error' },
    { id: 'transactions', label: 'Transactions', icon: 'swap_horiz', routerLink: '/transactions' },
  ]},
  { id: 'reports',  label: 'Reports',  icon: 'bar_chart', routerLink: '/reports', dividerBefore: true },
  { id: 'users',    label: 'Users',    icon: 'people',    routerLink: '/users', permission: 'users:read' },
  { id: 'settings', label: 'Settings', icon: 'settings',  routerLink: '/settings', dividerBefore: true },
];

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, MatCardModule,
    CuiIconComponent,
    CuiButtonComponent, CuiBadgeComponent, CuiAvatarComponent,
    CuiSpinnerComponent, CuiSkeletonComponent, CuiProgressComponent,
    CuiChipComponent, CuiTooltipDirective,
    CuiToastOutletComponent, CuiLoadingOverlayComponent, CuiEmptyStateComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  readonly frameworkVersion  = inject(FRAMEWORK_VERSION);
  readonly themeService      = inject(ThemeService);
  readonly menuService       = inject(MenuService);
  readonly toastService      = inject(ToastService);
  readonly loadingService    = inject(LoadingService);
  readonly permissionService = inject(PermissionService);
  private readonly iconRegistry = inject(IconRegistryService);

  readonly progress    = signal(65);
  readonly chipTags    = signal(['AML', 'KYC', 'SAR', 'CTR', 'Risk']);
  readonly cardLoading = signal(false);
  readonly showEmpty   = signal(false);
  readonly Math        = Math; // expose for template

  ngOnInit(): void {
    this.iconRegistry.registerAll(CUSTOM_ICONS);
    this.menuService.setItems(APP_MENU);
    this.menuService.activateByUrl('/alerts');
    this.permissionService.setPermissions(['users:read']);
  }

  toast(level: 'success'|'error'|'warning'|'info'): void {
    const msgs = { success:'Case closed successfully.', error:'Transaction verification failed.', warning:'Suspicious pattern detected.', info:'Report generation scheduled.' };
    this.toastService[level](msgs[level], { title: level.charAt(0).toUpperCase()+level.slice(1) });
  }

  simulateCardLoad(): void {
    this.cardLoading.set(true);
    setTimeout(() => this.cardLoading.set(false), 2000);
  }

  removeChip(tag: string): void {
    this.chipTags.update(t => t.filter(x => x !== tag));
  }
}
