import { AsyncPipe, CommonModule, NgClass, NgComponentOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  inject,
  input,
  Type,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { KcSanitizePipe } from '@keycloakify/angular/lib/pipes/kc-sanitize';
import { USE_DEFAULT_CSS } from '@keycloakify/angular/lib/tokens/use-default-css';
import { ComponentReference } from '@keycloakify/angular/login/classes/component-reference';
import { UserProfileFormFieldsComponent } from '../../components/user-profile-form-fields/user-profile-form-fields.component';
import { KcClassDirective } from '@keycloakify/angular/login/directives/kc-class';
import type { I18n } from '../../i18n';
import type { KcContext } from '../../KcContext';
import { UserProfileFormService } from '@keycloakify/angular/login/services/user-profile-form';
import { LOGIN_CLASSES } from '@keycloakify/angular/login/tokens/classes';
import { LOGIN_I18N } from '@keycloakify/angular/login/tokens/i18n';
import { KC_LOGIN_CONTEXT } from '@keycloakify/angular/login/tokens/kc-context';
import type { ClassKey } from 'keycloakify/login/lib/kcClsx';
import { map } from 'rxjs';

// SiMPL imports
import { SiLandingPageModule } from '@simpl/element-ng/landing-page';
import { SiCardComponent } from '@simpl/element-ng/card';
import { CopyrightDetails } from '@simpl/element-ng/copyright-notice';
import { elementEdit, elementUser } from '@simpl/element-icons/ionic';
import { addIcons, SiIconModule } from '@simpl/element-ng/icon';
import { SiFormModule } from '@simpl/element-ng/form';

@Component({
  selector: 'kc-login-update-profile',
  templateUrl: 'login-update-profile.component.html',
  styleUrls: ['login-update-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    KcClassDirective,
    AsyncPipe,
    KcSanitizePipe,
    NgClass,
    NgComponentOutlet,
    CommonModule,
    ReactiveFormsModule,
    SiLandingPageModule,
    SiCardComponent,
    SiIconModule,
    SiFormModule
  ],
  providers: [
    {
      provide: ComponentReference,
      useExisting: forwardRef(() => LoginUpdateProfileComponent),
    },
  ],
})
export class LoginUpdateProfileComponent extends ComponentReference {
  #userProfileFormService = inject(UserProfileFormService);
  kcContext = inject<Extract<KcContext, { pageId: 'login-update-profile.ftl' }>>(KC_LOGIN_CONTEXT);
  i18n = inject<I18n>(LOGIN_I18N);

  override doUseDefaultCss = inject<boolean>(USE_DEFAULT_CSS);
  override classes = inject<Partial<Record<ClassKey, string>>>(LOGIN_CLASSES);

  isFormSubmittable = toSignal(this.#userProfileFormService.formState$.pipe(map((s) => s.isFormSubmittable)), {
    initialValue: false,
  });
  userProfileFormFields = input<Type<UserProfileFormFieldsComponent>>();

  // Form validation error mappings
  errorCodeTranslateKeyMap = new Map<string, string>([
    ['required', 'This field is required'],
    ['email', 'Please enter a valid email'],
    ['pattern', 'The value does not match the required pattern'],
    ['minlength', 'Value is too short'],
    ['maxlength', 'Value is too long']
  ]);

  // Form field translation mappings
  controlNameTranslateKeyMap = new Map<string, string>([
    ['firstName', 'First Name'],
    ['lastName', 'Last Name'],
    ['email', 'Email'],
    ['username', 'Username']
  ]);

  // Register SiMPL icons
  constructor(){
    super();
    addIcons({ elementEdit, elementUser });
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
}
