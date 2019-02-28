import { Component, OnInit } from '@angular/core';
import { UpdatenoteComponent } from '../updatenote/updatenote.component';
import { Note } from 'src/app/core/models/note';
import { NoteService } from 'src/app/core/service/note.service';
import { MatSnackBar, MatDialog } from '@angular/material';

@Component({
  selector: 'app-archive-note',
  templateUrl: './archive-note.component.html',
  styleUrls: ['./archive-note.component.css']
})
export class ArchiveNoteComponent implements OnInit {

  public notes: Note[] = [];
  constructor(private noteService: NoteService, private snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.getNotes();
  }
  getNotes() {
    this.noteService.retrieveArchiveNotes().subscribe(newNote => {
      this.notes = newNote;
    }, error => {
      this.snackBar.open("error", "error to retrieve notes", { duration: 2000 });
    }
    )
  }

  openDialog(note): void {
    const dialogRef = this.dialog.open(UpdatenoteComponent, {
      width: '500px',
      data: note
    });
    dialogRef.afterClosed().subscribe(result => {
      this.noteService.updateNote(note,note.noteId).subscribe(response => {
        console.log(response);
      },
        error => {
          console.log("error");
        })
      console.log('The dialog was closed');
    });
  }

  deleteNote(note) {
    console.log(note.noteId);
    this.noteService.deleteNote(note.noteId).subscribe(response => {
      this.snackBar.open("deleted Note", "OK", { duration: 2000 });
    }), error => {
      this.snackBar.open("error", "error to retrieve notes", { duration: 2000 });
    }
  }

  updateArchiveNote(note)
  {
    var newNote={
      "archive": false,
      "description": note.description,
      "inTrash": note.inTrash,
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
