import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginGuard } from './core/guards/login.guard';
import { LoginComponent } from './components/login/login.component';
import { ContainerComponent } from './components/survey/container/container.component';
import { EditUserComponent } from './core/modals/edit-user/edit-user.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { RolesGuard } from './core/guards/roles.guard';
import { environment } from 'src/environments/environment';
import { ViewDetailsComponent } from './components/survey/view-details/view-details.component';

const ADMINROLE = +environment.adminRole;

const routes: Routes = [
  { path: 'home',             component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login',            component: LoginComponent, canActivate: [LoginGuard]},
  { path: 'survey-container', component: ContainerComponent, canActivate: [AuthGuard] },
  { path: 'admin',            component: AdminDashboardComponent, canActivate: [RolesGuard],
    data: {
      role: ADMINROLE
    }  },
  { path: 'survey-details/:userId', component: ViewDetailsComponent, canActivate: [RolesGuard],
    data: {
      role: ADMINROLE
    }  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
