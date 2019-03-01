import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/core/service/http.service';
import { NoteService } from 'src/app/core/service/note.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-notesearchbody',
  templateUrl: './notesearchbody.component.html',
  styleUrls: ['./notesearchbody.component.css']
})
export class NotesearchbodyComponent implements OnInit {
  public showHeader = true;
  createNoteForm: FormGroup;
  loading = false;
  submitted = false;
  public mytoken = localStorage.getItem('token')


  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
    private router: Router, private noteService: NoteService,
    private httpUtil: HttpService, private snackBar: MatSnackBar) { }

  ngOnInit() {

    this.createNoteForm = this.formBuilder.group({
      title: [''],
      description: ['']
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
      this.snackBar.open("sucess", "note created", {
        duration: 2000
      });
    })
  }

  archiveNoteSave(note)
  {
    this.submitted = true;

    if (this.createNoteForm.invalid) {
      return;
    }
    if (this.createNoteForm.value.title === "" && this.createNoteForm.value.description === "") {
      return;
    }
    var newNote = {
      "archive": true,
      "description": note.description,
      "inTrash": note.inTrash,
      "noteId": note.noteId,
      "pinned": note.pinned,
      "title": note.title
    }
    this.onSubmit(newNote);

  }

}
