import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UpdatenoteComponent } from '../updatenote/updatenote.component';
import { Note } from 'src/app/core/models/note';
import { MatDialog, MatSnackBar } from '@angular/material';
import { NoteService } from 'src/app/core/service/note.service';
import { FormControl } from '@angular/forms';
import { Label } from 'src/app/core/models/label';

@Component({
  selector: 'app-pin-note',
  templateUrl: './pin-note.component.html',
  styleUrls: ['./pin-note.component.css']
})
export class PinNoteComponent implements OnInit {
  @Input() notes

  @Output() updateNoteEvent = new EventEmitter();

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  public labels: Label[] = [];
  public newLabels: Label[] = [];


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
      const data = { note }
      this.updateNoteEvent.emit(data);
      console.log('The dialog was closed');
    });
  }

  addNoteLabel(data) {
    this.updateNoteEvent.emit(data);
  }

  moveToTrash(key, note) {
    note.inTrash = 1;
    const data = { key, note };
    this.updateNoteEvent.emit(data);
  }

  updateArchiveNote(key, note) {
    note.archive = 1;
    note.pinned = 0;
    const data = { key, note };
    this.updateNoteEvent.emit(data);
  }

  pinned(key, note) {
    note.pinned = key === 'pinned' ? 1 : 0;
    const data = { key, note };
    this.updateNoteEvent.emit(data);
  }

  removeLabel(label, note) {
    this.noteService.removeLabelFromNote(note.noteId, label.labelId).subscribe(response => {
      console.log("deleting check in database");
      const data = { note };
      this.updateNoteEvent.emit(data);
    }, (error) => console.log(error));
  }

}
