import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, forwardRef, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { KcSanitizePipe } from '@keycloakify/angular/lib/pipes/kc-sanitize';
import { USE_DEFAULT_CSS } from '@keycloakify/angular/lib/tokens/use-default-css';
import { ComponentReference } from '@keycloakify/angular/login/classes/component-reference';
import { LogoutOtherSessionsComponent } from '../../components/logout-other-sessions/logout-other-sessions.component';
import { PasswordWrapperComponent } from '../../components/password-wrapper/password-wrapper.component';
import { KcClassDirective } from '@keycloakify/angular/login/directives/kc-class';
import type { I18n } from '../../i18n';
import type { KcContext } from '../../KcContext';
import { LOGIN_CLASSES } from '@keycloakify/angular/login/tokens/classes';
import { LOGIN_I18N } from '@keycloakify/angular/login/tokens/i18n';
import { KC_LOGIN_CONTEXT } from '@keycloakify/angular/login/tokens/kc-context';
import type { ClassKey } from 'keycloakify/login/lib/kcClsx';

// SiMPL imports
import { SiLandingPageModule } from '@simpl/element-ng/landing-page';
import { SiCardComponent } from '@simpl/element-ng/card';
import { CopyrightDetails } from '@simpl/element-ng/copyright-notice';
import { elementKey, elementLock, elementVideo, elementHide } from '@simpl/element-icons/ionic';
import { addIcons, SiIconModule } from '@simpl/element-ng/icon';
import { SiFormModule } from '@simpl/element-ng/form';
import { SiPasswordToggleModule } from '@simpl/element-ng/password-toggle';

@Component({
  selector: 'kc-login-update-password',
  templateUrl: 'login-update-password.component.html',
  styleUrls: ['login-update-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    KcClassDirective,
    PasswordWrapperComponent,
    LogoutOtherSessionsComponent,
    AsyncPipe,
    KcSanitizePipe,
    CommonModule,
    ReactiveFormsModule,
    SiLandingPageModule,
    SiCardComponent,
    SiIconModule,
    SiFormModule,
    SiPasswordToggleModule
  ],
  providers: [
    {
      provide: ComponentReference,
      useExisting: forwardRef(() => LoginUpdatePasswordComponent),
    },
  ],
})
export class LoginUpdatePasswordComponent extends ComponentReference {
  kcContext = inject<Extract<KcContext, { pageId: 'login-update-password.ftl' }>>(KC_LOGIN_CONTEXT);
  i18n = inject<I18n>(LOGIN_I18N);

  override doUseDefaultCss = inject<boolean>(USE_DEFAULT_CSS);
  override classes = inject<Partial<Record<ClassKey, string>>>(LOGIN_CLASSES);

  // Form validation error mappings
  errorCodeTranslateKeyMap = new Map<string, string>([
    ['required', 'This field is required'],
    ['password.minlength', 'Password must be at least 8 characters'],
    ['password.pattern', 'Password must meet all requirements'],
    ['password-confirm.match', 'Passwords do not match']
  ]);

  // Form field translation mappings
  controlNameTranslateKeyMap = new Map<string, string>([
    ['password-new', 'New Password'],
    ['password-confirm', 'Confirm Password']
  ]);

  // Display message flag
  displayMessage = this.kcContext.messagesPerField.existsError('password', 'password-confirm');

  // Register SiMPL icons
  constructor(){
    super();
    addIcons({ elementKey, elementLock, elementVideo, elementHide });
  }

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

  // Password policy for display
  passwordPolicyItems = [
    '1 upper case letter [A..Z]',
    '1 lower case letter [a..z]',
    '1 number [0..9]',
    '1 special character [$,#,...]'
  ];
}
