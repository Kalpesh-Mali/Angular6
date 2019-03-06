import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatStepperModule} from '@angular/material/stepper'; 
import {MatCardModule} from '@angular/material/card'; 
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatInputModule} from '@angular/material/input'; 
import { FlexLayoutModule } from '@angular/flex-layout';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import {MatIconModule} from '@angular/material'; 
import { HttpClientModule } from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatMenuModule} from '@angular/material/menu'; 
import {MatButtonModule} from '@angular/material/button'; 
import { NgMatSearchBarModule } from 'ng-mat-search-bar';
import {MatDividerModule} from '@angular/material/divider'; 
import {MatTooltipModule} from '@angular/material/tooltip'; 
import {MatNativeDateModule, MatSidenavModule, MatListModule} from '@angular/material';


import {MatDialogModule} from '@angular/material/dialog';
import {MatChipsModule} from '@angular/material/chips';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatStepperModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    ShowHidePasswordModule,
    MatIconModule,
    HttpClientModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    NgMatSearchBarModule,
    MatDividerModule,
    MatTooltipModule,
    MatNativeDateModule, 
    MatSidenavModule, 
    MatListModule,
    MatSnackBarModule,
    MatDialogModule,
    MatChipsModule
  ],
  exports: [
    MatStepperModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    ShowHidePasswordModule,
    MatIconModule,
    HttpClientModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    NgMatSearchBarModule,
    MatDividerModule,
    MatTooltipModule,
    MatNativeDateModule, 
    MatSidenavModule, 
    MatListModule,
    MatSnackBarModule,
    MatDialogModule,
    MatChipsModule
  ],
})
export class AppMaterialModule { }
