import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AppMaterialModule } from './app-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


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
    WelcomeComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
 }
