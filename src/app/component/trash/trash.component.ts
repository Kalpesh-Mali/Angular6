import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/core/service/note.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Note } from 'src/app/core/models/note';
import { UpdatenoteComponent } from '../updatenote/updatenote.component';
import { TrashdailogComponent } from '../trashdailog/trashdailog.component';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})
export class TrashComponent implements OnInit {

  public notes: Note[] = [];
  constructor(private noteService: NoteService, private snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.getNotes();
  }

  getNotes() {
    this.noteService.retrieveNotes().subscribe(newNote => {
      this.notes = newNote;
    }, error => {
      this.snackBar.open("error", "error to retrieve notes", { duration: 2000 });
    }
    )
  }

  openDialog(note): void {
    const dialogRef = this.dialog.open(TrashdailogComponent, {
      width: '500px',
      data: note
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  deleteNote(note) {
    console.log(note.noteId);
    this.noteService.deleteNote(note.noteId).subscribe(response => {
      this.snackBar.open("deleted Note", "OK", { duration: 2000 });
      this.ngOnInit();
    }), error => {
      this.snackBar.open("error to delete notes", "error", { duration: 2000 });
    }
  }

  restore(note)
  {
    note.inTrash=0;
    console.log(note);
    this.noteService.updateNote(note,note.noteId).subscribe(response => {
      console.log(response);
      this.snackBar.open("Restored", "Ok", { duration: 2000 });
      this.ngOnInit();
    },
      error => {
        console.log("error");
      })
  }

}
