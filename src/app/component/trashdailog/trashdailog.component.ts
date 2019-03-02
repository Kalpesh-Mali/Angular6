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
    this.noteService.deleteNote(note.noteId).subscribe(response => {
      this.snackBar.open("deleted Note", "OK", { duration: 2000 });
    }), error => {
      this.snackBar.open("error to delete note", "error", { duration: 2000 });
    }
  }

  restore(note) {
    note.inTrash = 0;
    this.noteService.updateNote(note, note.noteId).subscribe(response => {
      console.log(response);
      this.snackBar.open("Restored", "Ok", { duration: 2000 });
    },
      error => {
        console.log("error");
      })
  }

}
