import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { WelcomeComponent } from './component/welcome/welcome.component';
import { NotesearchbodyComponent } from './component/notesearchbody/notesearchbody.component';
import { AuthGuard } from './gaurd/auth.guard';
import { ForgotpasswordComponent } from './component/forgotpassword/forgotpassword.component';
import { PasswordresetComponent } from './component/passwordreset/passwordreset.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'passwordforgot', 
    component: ForgotpasswordComponent
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'notesearchbody',
        component: NotesearchbodyComponent
      },
      {
        path: '',
        redirectTo: 'notesearchbody',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'resetpassword/:id', 
    component: PasswordresetComponent
  },
  {
    path: '**',
    redirectTo: 'login'
  }]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
