import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

// Import Containers
import {DefaultLayoutComponent} from './containers';

import {P404Component} from './views/error/404.component';
import {P500Component} from './views/error/500.component';
import {LoginComponent} from './views/login/login.component';
import {RegisterComponent} from './views/register/register.component';
import {LoginGuard} from './guards/login.guard';
import {ShowCvComponent} from './views/pages/CVThéque/show-cv/show-cv.component';
import {AddCvDetailComponent} from './views/pages/CVThéque/add-cv-detail/add-cv-detail.component';
import {ShowSourcerComponent} from './views/pages/Partenaire/show-sourcer/show-sourcer.component';
import {AddAffaireComponent} from './views/pages/Affaire/add-affaire/add-affaire.component';
import {AddPartenaireComponent} from './views/pages/Partenaire/add-partenaire/add-partenaire.component';
import {ListAffaireComponent} from './views/pages/Affaire/list-affaire/list-affaire.component';
import {ShowCustomerComponent} from './views/pages/customers/show-customer/show-customer.component';
import {AddMissionComponent} from './views/pages/mission/add-mission/add-mission.component';
import {ListProfilComponent} from './views/pages/CVThéque/list-profil/list-profil.component';
import {ActionsComponent} from './views/pages/actions/actions.component';
import {AddcustomerComponent} from './views/pages/customers/add/addcustomer/addcustomer.component';
import {ShowAffaireComponent} from './views/pages/Affaire/show-affaire/show-affaire.component';
import {ListCustomerComponent} from './views/pages/customers/list-customer/list-customer.component';
import {ListCvComponent} from './views/pages/CVThéque/list-cv/list-cv.component';
import {PanneauComponent} from './views/pages/panneau/panneau.component';
import {RechercheManuelleComponent} from './views/pages/CVThéque/recherche-manuelle/recherche-manuelle.component';
import {CalendrierComponent} from './views/pages/calendrier/calendrier/calendrier.component';
import {ListPartenaireComponent} from './views/pages/Partenaire/list-partenaire/list-partenaire.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    canActivate: [LoginGuard]
    ,
    children: [
      {
        path: 'showCv/:id',
        component: ShowCvComponent,
        data: {
          title: 'show cv'
        }
      },
      {
        path: 'showSourcer/:id',
        component: ShowSourcerComponent,
        data: {
          title: 'show cv'
        }
      },
      {
        path: 'addCandidatDetail/:id',
        component: AddCvDetailComponent,
        data: {
          title: 'show cv'
        }
      },
      {
        path: 'addCustomer',
        component: AddcustomerComponent,
        data: {
          title: 'Ajouter client'
        }
      },
      {
        path: 'customer/:id',
        component: AddcustomerComponent,
        data: {
          title: 'Modifier client'
        }
      },
      {
        path: 'business/:id',
        component: AddAffaireComponent,
        data: {
          title: 'Modifier affaire'
        }
      },
      {
        path: 'business/:id/:id2',
        component: AddAffaireComponent,
        data: {
          title: 'Ajouter affaire Client'
        }
      },
      {
        path: 'cv/:id',
        component: ListProfilComponent,
        data: {
          title: 'Modifier profil'
        }
      },
      {
        path: 'sourcer/:id',
        component: AddPartenaireComponent,
        data: {
          title: 'Modifier partenaire'
        }
      },
      {
        path: 'actions',
        component: ActionsComponent,
        data: {
          title: 'Actions'
        }
      },
      {
        path: 'addAffaire',
        component: AddAffaireComponent,
        data: {
          title: 'Add actions'
        }
      },
      {
        path: 'listAffaire',
        component: ListAffaireComponent,
        data: {
          title: 'list affaire'
        }
      },
      {
        path: 'showCustomer/:id',
        component: ShowCustomerComponent,
        data: {
          title: 'show customer'
        }
      },
      {
        path: 'showAffaire/:id',
        component: ShowAffaireComponent,
        data: {
          title: 'show affaire'
        }
      },
      {
        path: 'addMission/:id2',
        component: AddMissionComponent,
        data: {
          title: 'add mission'
        }
      },
      {
        path: 'addMission/:id2/:id',
        component: AddMissionComponent,
        data: {
          title: 'edit mission'
        }
      },
      {
        path: 'listCustomer',
        component: ListCustomerComponent,
        data: {
          title: 'list customer'
        }
      },
      {
        path: 'listProfil',
        component: ListProfilComponent,
        data: {
          title: 'list Profil'
        }
      },
      {
        path: 'rechercheManuelle',
        component: RechercheManuelleComponent,
        data: {
          title: 'recherche'
        }
      },
      {
        path: 'listCVThéque',
        component: ListCvComponent,
        data: {
          title: 'list cv'
        }
      },
      {
        path: 'calendrier',
        component: CalendrierComponent,
        data: {
          title: 'calendrier'
        }
      },
      {
        path: 'addPartenaire',
        component: AddPartenaireComponent,
        data: {
          title: 'add partenaire'
        }
      },
      {
        path: 'listPartenaire',
        component: ListPartenaireComponent,
        data: {
          title: 'list partenaire'
        }
      },
      {
        path: 'panneau',
        component: PanneauComponent,
        data: {
          title: 'panneau'
        }
      },
      {
        path: 'base',
        loadChildren: () => import('./views/base/base.module').then(m => m.BaseModule)
      },
      {
        path: 'buttons',
        loadChildren: () => import('./views/buttons/buttons.module').then(m => m.ButtonsModule)
      },
      {
        path: 'charts',
        loadChildren: () => import('./views/chartjs/chartjs.module').then(m => m.ChartJSModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'icons',
        loadChildren: () => import('./views/icons/icons.module').then(m => m.IconsModule)
      },
      {
        path: 'notifications',
        loadChildren: () => import('./views/notifications/notifications.module').then(m => m.NotificationsModule)
      },
      {
        path: 'theme',
        loadChildren: () => import('./views/theme/theme.module').then(m => m.ThemeModule)
      },
      {
        path: 'widgets',
        loadChildren: () => import('./views/widgets/widgets.module').then(m => m.WidgetsModule)
      }
    ]
  },
  {path: '**', component: P404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
