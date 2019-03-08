import { Component, OnInit } from '@angular/core';
import { UpdatenoteComponent } from '../updatenote/updatenote.component';
import { Note } from 'src/app/core/models/note';
import { NoteService } from 'src/app/core/service/note.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Label } from 'src/app/core/models/label';

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
  public labels: Label[] = [];
  public newLabels: Label[] = [];

  constructor(private noteService: NoteService, private snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.getNotes();
    // this.getLabels();
  }

  public getNotes() {
    this.noteService.retrieveNotes().subscribe(newNote => {
      this.notes = newNote;
    }, error => {
      this.snackBar.open("error", "error to retrieve notes", { duration: 2000 });
    }
    )
  }

  public openDialog(note): void {
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

  public updateMethod(note) {
    this.noteService.updateNote(note, note.noteId).subscribe(response => {
      this.getNotes();
      console.log(response);
    },
      error => {
        console.log("error");
      })
  }

  public moveToTrash(note) {
    note.inTrash = 1;
    this.updateMethod(note);
  }

  public updateArchiveNote(note) {
    note.archive = 0;
    this.updateMethod(note);
  }

  public pinned(note) {
    note.pinned = 1;
    this.updateMethod(note);
  }

  public removeLabel(label, note) {
    this.noteService.removeLabelFromNote(note.noteId, label.labelId).subscribe(response => {
      console.log("deleting check in database");
      this.getNotes();
    }, (error) => console.log(error));
  }

  public addNoteLabel(data)
  {
    this.updateMethod(data.note)
  }

}
