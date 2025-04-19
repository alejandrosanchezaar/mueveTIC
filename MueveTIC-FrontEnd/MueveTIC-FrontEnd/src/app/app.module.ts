import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RegisterComponent } from './register/register.component';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { ForgotPwdComponent } from './forgot-pwd/forgot-pwd.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ResetPwdComponent } from './reset-pwd/reset-pwd.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserComponent } from './user/user.component';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { PersonalComponent } from './personal/personal.component';





@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    AdminComponent,
    LoginComponent,
    ForgotPwdComponent,
    PageNotFoundComponent,
    ResetPwdComponent,
    UserComponent,
    PersonalComponent


  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    NgbRatingModule,
    MatTooltipModule,
    MatInputModule


  ],
  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule { }
