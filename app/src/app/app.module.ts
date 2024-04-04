import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoadingComponent } from './core/loading/loading.component';
import { ErrorComponent } from './core/errors/error.component';
import { ApiCallerService } from './core/services/api-caller.service';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './core/menu/menu.component';
import { BasicTableComponent } from './core/tables/basic-table/basic-table.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { MainContainerComponent } from './core/main-container/main-container.component';
import { environment } from '../environments/environment.prod';
import { ContainerComponent } from './components/survey/container/container.component';
import { AnswerOpenTextComponent } from './components/survey/answer-open-text/answer-open-text.component';
import { AnswerOpenTextNumberComponent } from './components/survey/answer-open-text-number/answer-open-text-number.component';
import { AnswerOpenTextYearComponent } from './components/survey/answer-open-text-year/answer-open-text-year.component';
import { AnswerOpenTextCurrencyComponent } from './components/survey/answer-open-text-currency/answer-open-text-currency.component';
import { AnswerRadioGroupComponent } from './components/survey/answer-radio-group/answer-radio-group.component';
import { AnswerOpenTextOnehundredpcComponent } from './components/survey/answer-open-text-onehundredpc/answer-open-text-onehundredpc.component';
import { AnswerCheckGroupComponent } from './components/survey/answer-check-group/answer-check-group.component';
import { ErrorInterceptor } from './core/utils/error.Interceptor';
import { EditUserComponent } from './core/modals/edit-user/edit-user.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { SmartTableComponent } from './core/tables/smart-table/smart-table.component';
import { TableComponent } from './components/user/table/table.component';
import { ViewDetailsComponent } from './components/survey/view-details/view-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoadingComponent,
    ErrorComponent,
    RegisterComponent,
    LoginComponent,
    MenuComponent,
    BasicTableComponent,
    NavbarComponent,
    MainContainerComponent,
    ContainerComponent,
    AnswerOpenTextComponent,
    AnswerOpenTextNumberComponent,
    AnswerOpenTextYearComponent,
    AnswerOpenTextCurrencyComponent,
    AnswerRadioGroupComponent,
    AnswerOpenTextOnehundredpcComponent,
    AnswerCheckGroupComponent,
    EditUserComponent,
    AdminDashboardComponent,
    SmartTableComponent,
    TableComponent,
    ViewDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
  ],
  providers: [
    ApiCallerService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
