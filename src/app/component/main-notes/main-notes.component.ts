import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/core/service/note.service';
import { Note } from 'src/app/core/models/note';
import { MatSnackBar, MatDialog } from '@angular/material';
import { UpdatenoteComponent } from '../updatenote/updatenote.component';

@Component({
  selector: 'app-main-notes',
  templateUrl: './main-notes.component.html',
  styleUrls: ['./main-notes.component.css']
})
export class MainNotesComponent implements OnInit {

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

  checkNote(note) {
    if (note.archieve == false && note.inTrash == false)
      return true;
    else
      return false;
  }

  openDialog(note): void {
    const dialogRef = this.dialog.open(UpdatenoteComponent, {
      width: '500px',
      data: note
    });
    dialogRef.afterClosed().subscribe(result => {
      this.noteService.updateNote(note, note.noteId).subscribe(response => {
        console.log(response);
      },
        error => {
          console.log("error");
        })
      console.log('The dialog was closed');
    });
  }


  moveToTrash(note) {
    var newNote = {
      "archive": note.archive,
      "description": note.description,
      "inTrash": true,
      "noteId": note.noteId,
      "pinned": note.pinned,
      "title": note.title
    }
    console.log(newNote);
    this.noteService.updateNote(newNote, note.noteId).subscribe(response => {
      console.log(response);
      this.snackBar.open("moved to trash", "Ok", { duration: 2000 });
    },
      error => {
        console.log("error");
      })
  }

  updateArchiveNote(note) {
    var newNote = {
      "archive": true,
      "description": note.description,
      "inTrash": note.inTrash,
      "noteId": note.noteId,
      "pinned": note.pinned,
      "title": note.title
    }
    console.log(newNote);
    this.noteService.updateNote(newNote, note.noteId).subscribe(response => {
      console.log(response);
      this.snackBar.open("archieve OK", "Ok", { duration: 2000 });
    },
      error => {
        console.log("error");
      })
  }
}
