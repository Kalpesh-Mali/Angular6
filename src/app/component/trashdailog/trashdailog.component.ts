import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { NoteService } from 'src/app/core/service/note.service';
import { Note } from 'src/app/core/models/note';

@Component({
  selector: 'app-trashdailog',
  templateUrl: './trashdailog.component.html',
  styleUrls: ['./trashdailog.component.css']
})
export class TrashdailogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TrashdailogComponent>,
    @Inject(MAT_DIALOG_DATA) public note: Note, private noteService: NoteService,
    private snackBar: MatSnackBar) { }
  
  ngOnInit() {
  }

  deleteNote(note) {
    console.log(note.noteId);
    this.noteService.deleteNote(note.noteId).subscribe(response => {
      this.snackBar.open("deleted Note", "OK", { duration: 2000 });
    }), error => {
      this.snackBar.open("error", "error to retrieve notes", { duration: 2000 });
    }
  }

  restore(note)
  {
    var newNote={
      "archive": note.archive,
      "description": note.description,
      "inTrash": false,
      "noteId": note.noteId,
      "pinned": note.pinned,
      "title": note.title
    }
    console.log(newNote);
    this.noteService.updateNote(newNote,note.noteId).subscribe(response => {
      console.log(response);
      this.snackBar.open("archieve OK", "Ok", { duration: 2000 });
    },
      error => {
        console.log("error");
      })
  }

}
