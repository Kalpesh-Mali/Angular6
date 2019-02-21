import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NotesearchbodyComponent } from './notesearchbody/notesearchbody.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'welcome', component: WelcomeComponent,
    children: [
      { path: '', redirectTo: 'notesearchbody', pathMatch: 'full' },
      { path: 'notesearchbody', component: NotesearchbodyComponent },
    ]
  },
  { path: '**', redirectTo: 'welcome' }]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
