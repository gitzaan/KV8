import { AsyncPipe, CommonModule, NgClass, NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  inject,
  input,
  signal,
  Type,
  viewChild,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
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
import { SiPasswordToggleModule } from '@simpl/element-ng/password-toggle';
import { CopyrightDetails } from '@simpl/element-ng/copyright-notice';
import { elementHide, elementShow } from '@simpl/element-icons/ionic';
import { addIcons, SiIconModule } from '@simpl/element-ng/icon';
import { SiFormModule } from '@simpl/element-ng/form';

@Component({
  selector: 'kc-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    KcClassDirective,
    AsyncPipe,
    KcSanitizePipe,
    NgClass,
    NgComponentOutlet,
    NgTemplateOutlet,
    CommonModule,
    ReactiveFormsModule,
    SiLandingPageModule,
    SiPasswordToggleModule,
    SiIconModule,
    SiFormModule
  ],
  providers: [
    {
      provide: ComponentReference,
      useExisting: forwardRef(() => RegisterComponent),
    },
  ],
})
export class RegisterComponent extends ComponentReference {
  #userProfileFormService = inject(UserProfileFormService);
  kcContext = inject<Extract<KcContext, { pageId: 'register.ftl' }>>(KC_LOGIN_CONTEXT);
  i18n = inject<I18n>(LOGIN_I18N);

  override doUseDefaultCss = inject<boolean>(USE_DEFAULT_CSS);
  override classes = inject<Partial<Record<ClassKey, string>>>(LOGIN_CLASSES);

  isFormSubmittable = toSignal(this.#userProfileFormService.formState$.pipe(map((s) => s.isFormSubmittable)), {
    initialValue: false,
  });
  areTermsAccepted = signal(false);
  userProfileFormFields = input<Type<UserProfileFormFieldsComponent>>();

  // Form related properties
  registrationForm = new FormGroup({});

  // Error mapping for SiMPL form container
  errorCodeTranslateKeyMap = new Map<string, string>([
    ['required', 'This field is required'],
    ['email', 'Please enter a valid email'],
    ['pattern', 'The value does not match the required pattern'],
    ['minlength', 'Value is too short'],
    ['maxlength', 'Value is too long'],
    ['termsAccepted.required', 'You must accept the terms']
  ]);

  // Register SiMPL icons
  constructor(){
    super();
    addIcons({ elementHide, elementShow });
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

  onCallback() {
    (document.getElementById('kc-register-form') as HTMLFormElement).submit();
  }
}
