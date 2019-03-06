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
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
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
      this.getNotes();
      console.log('The dialog was closed');
    });
  }

  updateMethod(note) {
    this.noteService.updateNote(note, note.noteId).subscribe(response => {
      console.log(response);
    },
      error => {
        console.log("error");
      })
  }

  moveToTrash(note) {
    note.inTrash = 1;
    this.updateMethod(note);
  }

  updateArchiveNote(note) {
    note.archive = 0;
    this.updateMethod(note);
  }

  pinned(note) {
    note.pinned = 1;
    this.updateMethod(note);
  }

  removeLabel(label, note) {
    this.noteService.removeLabelFromNote(note.noteId, label.labelId).subscribe(response => {
      console.log("deleting check in database");
      this.getNotes();
    }, (error) => console.log(error));
  }

}
