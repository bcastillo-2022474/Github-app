import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {UserCardComponent} from './components/user-card/user-card.component';
import {UsersComponent} from './pages/users/users.component';
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import {NgSelectModule} from "@ng-select/ng-select";
import { UserComponent } from './pages/user/user.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { HoverParentDirective } from './directives/hover-parent.directive';
import { UserOverviewTabComponent } from './components/user-overview-tab/user-overview-tab.component';
import { UserRepositoriesTabComponent } from './components/user-repositories-tab/user-repositories-tab.component';
import { UserProjectsTabComponent } from './components/user-projects-tab/user-projects-tab.component';
import { UserPackagesTabComponent } from './components/user-packages-tab/user-packages-tab.component';
import { UserStartsTabComponent } from './components/user-starts-tab/user-starts-tab.component';

@NgModule({
  declarations: [
    AppComponent,
    UserCardComponent,
    UsersComponent,
    UserComponent,
    HoverParentDirective,
    UserOverviewTabComponent,
    UserRepositoriesTabComponent,
    UserProjectsTabComponent,
    UserPackagesTabComponent,
    UserStartsTabComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgSelectModule,
        FontAwesomeModule
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
