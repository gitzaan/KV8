import { AsyncPipe, CommonModule, NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  inject,
  signal,
  type TemplateRef,
  viewChild,
} from '@angular/core';
import { KcSanitizePipe } from '@keycloakify/angular/lib/pipes/kc-sanitize';
import { USE_DEFAULT_CSS } from '@keycloakify/angular/lib/tokens/use-default-css';
import { ComponentReference } from '@keycloakify/angular/login/classes/component-reference';
import { KcClassDirective } from '@keycloakify/angular/login/directives/kc-class';
import type { I18n } from '../../i18n';
import type { KcContext } from '../../KcContext';
import { LOGIN_CLASSES } from '@keycloakify/angular/login/tokens/classes';
import { LOGIN_I18N } from '@keycloakify/angular/login/tokens/i18n';
import { KC_LOGIN_CONTEXT } from '@keycloakify/angular/login/tokens/kc-context';
import type { ClassKey } from 'keycloakify/login/lib/kcClsx';

// SiMPL imports
import { SiLandingPageModule } from '@simpl/element-ng/landing-page';
import { SiPasswordToggleModule } from '@simpl/element-ng/password-toggle';
import { CopyrightDetails } from '@simpl/element-ng/copyright-notice';
import { elementHide, elementShow } from '@simpl/element-icons/ionic';
import { addIcons, SiIconModule } from '@simpl/element-ng/icon';

@Component({
  selector: 'kc-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    KcClassDirective,
    AsyncPipe,
    KcSanitizePipe,
    NgClass,
    CommonModule,
    SiLandingPageModule,
    SiPasswordToggleModule,
    SiIconModule
  ],
  providers: [
    {
      provide: ComponentReference,
      useExisting: forwardRef(() => LoginComponent),
    },
  ],
})
export class LoginComponent extends ComponentReference {

  constructor(){
    super();
    addIcons({ elementHide, elementShow });
  }
  kcContext = inject<Extract<KcContext, { pageId: 'login.ftl' }>>(KC_LOGIN_CONTEXT);
  i18n = inject<I18n>(LOGIN_I18N);

  override doUseDefaultCss = inject<boolean>(USE_DEFAULT_CSS);
  override classes = inject<Partial<Record<ClassKey, string>>>(LOGIN_CLASSES);

  // Register SiMPL icons
  protected readonly icons = addIcons({ elementHide, elementShow });

  // SiMPL related properties
  copyrightDetails: CopyrightDetails = {
    startYear: 2024,
    lastUpdateYear: 2024,
    company: 'Siemens'
  };


  // Background image path
  backgroundImageUrl = './assets/images/landing-page-digitalcity.webp';

  // Version info for footer
  appVersion = 'Version 1.0';

  // Footer links defined in SiMPL style
  footerLinks = [
    { title: 'Corporate Information', href: 'http://www.siemens.com/corporate-information' },
    { title: 'Privacy Notice', href: 'http://www.siemens.com/privacy-notice' },
    { title: 'Terms of Use', href: 'http://www.siemens.com/terms-of-use' }
  ];

  // Keycloak properties
  displayRequiredFields = false;
  displayInfo =
    !!this.kcContext?.realm?.password &&
    !!this.kcContext?.realm?.registrationAllowed &&
    !this.kcContext?.registrationDisabled;
  displayMessage = !this.kcContext?.messagesPerField?.existsError('username', 'password');

  headerNode = viewChild<TemplateRef<HTMLElement>>('headerNode');
  infoNode = viewChild<TemplateRef<HTMLElement>>('infoNode');
  socialProvidersNode = viewChild<TemplateRef<HTMLElement>>('socialProvidersNode');

  isLoginButtonDisabled = signal(false);

  get registrationDisabled(): boolean {
    return this.kcContext?.registrationDisabled || false;
  }
}
