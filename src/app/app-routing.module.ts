import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { WelcomeComponent } from './component/welcome/welcome.component';
import { NotesearchbodyComponent } from './component/notesearchbody/notesearchbody.component';
import { AuthGuard } from './gaurd/auth.guard';

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
    path: 'welcome',
    component: WelcomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'notesearchbody',
        pathMatch: 'full'
      },
      {
        path: 'notesearchbody',
        component: NotesearchbodyComponent
      },
    ]
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
