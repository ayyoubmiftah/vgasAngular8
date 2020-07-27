import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {PERFECT_SCROLLBAR_CONFIG} from 'ngx-perfect-scrollbar';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import {AppComponent} from './app.component';
// Import containers
import {DefaultLayoutComponent} from './containers';

import {P404Component} from './views/error/404.component';
import {P500Component} from './views/error/500.component';
import {LoginComponent} from './views/login/login.component';
import {RegisterComponent} from './views/register/register.component';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';
// Import routing module
import {AppRoutingModule} from './app.routing';
// Import 3rd party components
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {ChartsModule} from 'ng2-charts';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {NgxUiLoaderConfig, NgxUiLoaderModule, NgxUiLoaderRouterModule, PB_DIRECTION, POSITION, SPINNER} from 'ngx-ui-loader';
import {AddAffaireComponent} from './views/pages/Affaire/add-affaire/add-affaire.component';
import {ListCustomerComponent} from './views/pages/customers/list-customer/list-customer.component';
import {ListCvComponent} from './views/pages/CVThéque/list-cv/list-cv.component';
import {RechercheManuelleComponent} from './views/pages/CVThéque/recherche-manuelle/recherche-manuelle.component';
import {AddPartenaireComponent} from './views/pages/Partenaire/add-partenaire/add-partenaire.component';
import {ListAffaireComponent} from './views/pages/Affaire/list-affaire/list-affaire.component';
import {CalendrierComponent} from './views/pages/calendrier/calendrier/calendrier.component';
import {ListProfilComponent} from './views/pages/CVThéque/list-profil/list-profil.component';
import {ActionsComponent} from './views/pages/actions/actions.component';
import {AddCvDetailComponent} from './views/pages/CVThéque/add-cv-detail/add-cv-detail.component';
import {ShowSourcerComponent} from './views/pages/Partenaire/show-sourcer/show-sourcer.component';
import {AddcustomerComponent} from './views/pages/customers/add/addcustomer/addcustomer.component';
import {ShowAffaireComponent} from './views/pages/Affaire/show-affaire/show-affaire.component';
import {PanneauComponent} from './views/pages/panneau/panneau.component';
import {ShowMissionComponent} from './views/pages/mission/show-mission/show-mission.component';
import {ShowCustomerComponent} from './views/pages/customers/show-customer/show-customer.component';
import {AddMissionComponent} from './views/pages/mission/add-mission/add-mission.component';
import {ShowCvComponent} from './views/pages/CVThéque/show-cv/show-cv.component';
import {ListPartenaireComponent} from './views/pages/Partenaire/list-partenaire/list-partenaire.component';
import {ImageCropperModule} from 'ngx-image-cropper';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {PaginationComponent} from './shared/pagination/pagination.component';
import {BsModalService, ModalModule, PaginationConfig, PaginationModule} from 'ngx-bootstrap';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: 'blue',
  bgsPosition: POSITION.centerCenter,
  bgsSize: 60,
  pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  pbThickness: 5, // progress bar thickness
  fgsColor: 'blue'
};

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderRouterModule,
    ImageCropperModule,
    NgMultiSelectDropDownModule.forRoot(),
    ReactiveFormsModule,
    PaginationModule,
    ModalModule
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
    AddcustomerComponent,
    ActionsComponent,
    AddAffaireComponent,
    ListAffaireComponent,
    ListCustomerComponent,
    ListProfilComponent,
    RechercheManuelleComponent,
    ListCvComponent,
    CalendrierComponent,
    ListPartenaireComponent,
    AddPartenaireComponent,
    PanneauComponent,
    ShowAffaireComponent,
    AddMissionComponent,
    ShowCustomerComponent,
    ShowCvComponent,
    ShowSourcerComponent,
    AddCvDetailComponent,
    ShowMissionComponent,
    PaginationComponent
  ],
  exports: [PaginationComponent],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }, BsModalService, PaginationConfig],
  bootstrap: [AppComponent]
})
export class AppModule {
}
