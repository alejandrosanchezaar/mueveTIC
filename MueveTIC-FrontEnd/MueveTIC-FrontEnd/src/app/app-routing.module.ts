// app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgotPwdComponent } from './forgot-pwd/forgot-pwd.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';
import { ResetPwdComponent } from './reset-pwd/reset-pwd.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './auth.guard';
import { PersonalComponent } from './personal/personal.component';
import { AdminSecurity } from './admin-security.guard';
import { UserSecurity } from './user-security.guard';
import {PersonalSecurity} from './personal-security.guard';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPwdComponent },
  { path: 'reset-pwd', component: ResetPwdComponent },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard, UserSecurity]},
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard, AdminSecurity]},
  { path: 'personal', component: PersonalComponent, canActivate: [AuthGuard,PersonalSecurity] },
  { path: '**', component: PageNotFoundComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
