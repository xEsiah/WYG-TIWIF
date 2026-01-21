import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppRoutingModule } from './app-routing-module';
import { AppComponent } from './app';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AuthInterceptor } from './services/auth.interceptor';
import { DestinationsComponent } from './components/destinations/destinations';
import { HomeComponent } from './components/home/home';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions';
import { SharedModule } from './components/shared/shared.module';
import { ProfilComponent } from './components/profile/profile';

@NgModule({
  declarations: [
    AppComponent,
    DestinationsComponent,
    HomeComponent,
    SubscriptionsComponent,
    ProfilComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [provideHttpClient(withInterceptors([AuthInterceptor]))],
  bootstrap: [AppComponent],
})
export class AppModule {}
