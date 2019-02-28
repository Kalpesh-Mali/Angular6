import { Component, OnInit, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { NoteService } from 'src/app/core/service/note.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Note } from 'src/app/core/models/note';

@Component({
  selector: 'app-updatenote',
  templateUrl: './updatenote.component.html',
  styleUrls: ['./updatenote.component.css']
})
export class UpdatenoteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UpdatenoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Note, private noteService: NoteService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  closeClick(newNote) {
    console.log(newNote.title);
    console.log(newNote.description);
    this.noteService.updateNote(newNote,newNote.noteId).subscribe(response => {
      console.log(response);
    },
      error => {
        console.log("error");
      })
    this.dialogRef.close();
  }
  deleteNote(note) {
    console.log(note.noteId);
    this.noteService.deleteNote(note.noteId).subscribe(response => {
      this.snackBar.open("deleted Note", "OK", { duration: 2000 });
    }), error => {
      this.snackBar.open("error", "error to retrieve notes", { duration: 2000 });
    }
  }

}