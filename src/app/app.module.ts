import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MarkdownModule} from 'ngx-markdown';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ApiCardComponent } from './components/api-card/api-card.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { MarketplaceApiDetailsComponent } from './components/marketplace-api-details/marketplace-api-details.component';
import { HomeComponent } from './components/home/home.component';
import { MarketplaceApiTermsComponent } from './components/marketplace-api-terms/marketplace-api-terms.component';
import { MarketplaceSignupStepperComponent } from './components/marketplace-signup-stepper/marketplace-signup-stepper.component';
import { MarketplaceApiPoliciesComponent } from './components/marketplace-api-policies/marketplace-api-policies.component';
import { MarketplaceApiConfirmationComponent } from './components/marketplace-api-confirmation/marketplace-api-confirmation.component';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { MarketplaceApiDescriptionComponent } from './components/marketplace-api-description/marketplace-api-description.component';
import { PlanCardComponent } from './components/plan-card/plan-card.component';
import { MarketplaceComponent } from './components/marketplace/marketplace.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {InitializerService} from './services/initializer/initializer.service';
import config from './../../config.json';
import {MaterialModule} from './material.module';

export function initializeApp(devPortalInitializer: InitializerService): () => Promise<void> {
  /* Define promisses needed for the app initialization */
  const initLanguagePromise: Promise<void> = new Promise((resolve, reject) => {
    devPortalInitializer.initLanguage(config.language).then(() => {
      resolve();
    }).catch(() => {
      reject();
    });
  });

  return (): Promise<void> => {
    return new Promise((resolve, reject) => {
      /* Insert defined promisses */
      Promise.all([initLanguagePromise]).then(() => {
        resolve();
      }).catch((e) => {
        reject(e);
      });
    });
  }
}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './../assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ApiCardComponent,
    CardListComponent,
    MarketplaceApiDetailsComponent,
    MarketplaceApiTermsComponent,
    MarketplaceSignupStepperComponent,
    HomeComponent,
    MarketplaceApiPoliciesComponent,
    MarketplaceApiConfirmationComponent,
    MarketplaceApiDescriptionComponent,
    PlanCardComponent,
    MarketplaceComponent
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MarkdownModule.forRoot(),
    FormsModule,
    HttpClientModule,
    ClipboardModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      }
    })
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initializeApp,
    multi: true,
    deps: [InitializerService]
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
