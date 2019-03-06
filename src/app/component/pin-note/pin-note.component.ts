import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UpdatenoteComponent } from '../updatenote/updatenote.component';
import { Note } from 'src/app/core/models/note';
import { MatDialog, MatSnackBar } from '@angular/material';
import { NoteService } from 'src/app/core/service/note.service';

@Component({
  selector: 'app-pin-note',
  templateUrl: './pin-note.component.html',
  styleUrls: ['./pin-note.component.css']
})
export class PinNoteComponent implements OnInit {
  @Input() notes

  @Output() eventPin = new EventEmitter();

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  constructor(private noteService: NoteService, private snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit() {
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
      this.eventPin.emit(true);
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
    note.archive = 1;
    note.pinned = 0;
    this.updateMethod(note);
  }

  pinned(note) {
    note.pinned = 0;
    this.updateMethod(note);
  }

  removeLabel(label, note) {
    this.noteService.removeLabelFromNote(note.noteId, label.labelId).subscribe(response => {
      console.log("deleting check in database");
      this.eventPin.emit(true);
    }, (error) => console.log(error));
  }

}
