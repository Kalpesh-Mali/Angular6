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
import { ArchiveNoteComponent } from './component/archive-note/archive-note.component';
import { TrashComponent } from './component/trash/trash.component';
import { TrashdailogComponent } from './component/trashdailog/trashdailog.component';
import { PinNoteComponent } from './component/pin-note/pin-note.component';
import { SidenavbarComponent } from './component/sidenavbar/sidenavbar.component';
import { EditLabelsComponent } from './component/edit-labels/edit-labels.component';
import { NoteFilterPipe } from './pipe/note-filter.pipe';
import { AddNoteLabelsComponent } from './component/add-note-labels/add-note-labels.component';
import { SearchPipe } from './pipe/search.pipe';
import { SearchNoteComponent } from './component/search-note/search-note.component';
import { SearchNotesPipe } from './pipe/search-notes.pipe';
import { CollaboratorComponent } from './component/collaborator/collaborator.component';
import { ImageComponent } from './component/image/image.component';
import { SearchUserPipe } from './pipe/search-user.pipe';
import { ChangeColorComponent } from './component/change-color/change-color.component';
import { RemainderComponent } from './component/remainder/remainder.component';
import { DynamicHoverClassDirective } from './directive/dynamic-hover-class.directive';


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
    ArchiveNoteComponent,
    TrashComponent,
    TrashdailogComponent,
    PinNoteComponent,
    SidenavbarComponent,
    EditLabelsComponent,
    NoteFilterPipe,
    AddNoteLabelsComponent,
    SearchPipe,
    SearchNoteComponent,
    SearchNotesPipe,
    CollaboratorComponent,
    ImageComponent,
    SearchUserPipe,
    ChangeColorComponent,
    RemainderComponent,
    DynamicHoverClassDirective,
    
  ],
  entryComponents: [UpdatenoteComponent,TrashdailogComponent,EditLabelsComponent,
  CollaboratorComponent,ImageComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
 }
