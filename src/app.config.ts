import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { provideNgxTranslateForElement } from '@simpl/element-translate-ng/ngx-translate';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideAnimations(),

    provideNgxTranslateForElement(),
    importProvidersFrom(TranslateModule.forRoot())
  ],
};
