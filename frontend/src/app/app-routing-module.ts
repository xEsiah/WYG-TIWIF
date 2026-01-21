import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { DestinationsComponent } from './components/destinations/destinations';
import { HomeComponent } from './components/home/home';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions';
import { ProfilComponent } from './components/profile/profile';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'auth',
    loadChildren: () => import('./components/auth/auth-module').then((m) => m.AuthModule),
    canActivate: [authGuard],
  },

  {
    path: 'destinations',
    component: DestinationsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'subscriptions',
    component: SubscriptionsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'profile',
    component: ProfilComponent,
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
