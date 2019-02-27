import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './component/register/register.component';
import { WelcomeComponent } from './component/welcome/welcome.component';
import { AppMaterialModule } from './app-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotesearchbodyComponent } from './component/notesearchbody/notesearchbody.component';
import { ForgotpasswordComponent } from './component/forgotpassword/forgotpassword.component';
import { PasswordresetComponent } from './component/passwordreset/passwordreset.component';
import { MainNotesComponent } from './component/main-notes/main-notes.component';
import { UpdatenoteComponent } from './component/updatenote/updatenote.component';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    BrowserAnimationsModule

  ],
  exports: [
    FormsModule,
    ReactiveFormsModule, 
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    WelcomeComponent,
    NotesearchbodyComponent,
    ForgotpasswordComponent,
    PasswordresetComponent,
    MainNotesComponent,
    UpdatenoteComponent,
    
  ],
  entryComponents: [UpdatenoteComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
 }
