import { Component, OnInit, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/core/service/http.service';
import { NoteService } from 'src/app/core/service/note.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { EventEmitter } from '@angular/core';
import { CollaboratorComponent } from '../collaborator/collaborator.component';

@Component({
  selector: 'app-notesearchbody',
  templateUrl: './notesearchbody.component.html',
  styleUrls: ['./notesearchbody.component.scss']
})
export class NotesearchbodyComponent implements OnInit {

  @Output() eventCreate = new EventEmitter();

  public showHeader = true;
  createNoteForm: FormGroup;
  loading = false;
  submitted = false;
  selectedMoment =new Date();
  public min = new Date();
  public mytoken = localStorage.getItem('token')


  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
    private router: Router, private noteService: NoteService,
    private httpUtil: HttpService, private snackBar: MatSnackBar,
    private dialog:MatDialog) { }

  ngOnInit() {

    this.createNoteForm = this.formBuilder.group({
      title: [''],
      description: [''],
      remainder:''
    });
  }
  get f() { return this.createNoteForm.controls; }

  onSubmit(note) {
    this.submitted = true;
    if (this.createNoteForm.invalid) {
      return;
    }
    if (this.createNoteForm.value.title === "" && this.createNoteForm.value.description === "") {
      return;
    }
    console.log(this.mytoken);
    console.log(note);
    this.noteService.createNote(note).subscribe(response => {
      this.eventCreate.emit(true);
      this.snackBar.open("success", "note created", {
        duration: 2000
      });
    })
  }

  archiveNoteSave(note) {
    const newNote = {
      ...note,
      archive: true
    }
    console.log(newNote.archive);
    this.onSubmit(newNote);

  }

  pinnedNoteSave(note) {
    const newNote = {
      ...note,
      pinned: true,
    }
    this.onSubmit(newNote);
  }

  updateColor(data)
  {
    this.onSubmit(data.note);
  }

  public saveRemainder(selectedMoment,note)
  {
    const newNote = {
      ...note,
      remainder: selectedMoment,
    }
    this.onSubmit(newNote);
  }

  // public dailogCollaborator(note) {
  //   if (note.title === "" && note.description === "") {
  //     return;
  //   }
  //   const dialogRef = this.dialog.open(CollaboratorComponent, {
  //     width: '500px',
  //     data: note
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //   });
  // }

}
