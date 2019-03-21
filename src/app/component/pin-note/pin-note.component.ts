import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UpdatenoteComponent } from '../updatenote/updatenote.component';
import { Note } from 'src/app/core/models/note';
import { MatDialog, MatSnackBar } from '@angular/material';
import { NoteService } from 'src/app/core/service/note.service';
import { FormControl } from '@angular/forms';
import { Label } from 'src/app/core/models/label';
import { CollaboratorComponent } from '../collaborator/collaborator.component';

@Component({
  selector: 'app-pin-note',
  templateUrl: './pin-note.component.html',
  styleUrls: ['./pin-note.component.scss']
})
export class PinNoteComponent implements OnInit {
  @Input() notes
  @Input() public grid = false;
  @Input() message;

  @Output() updateNoteEvent = new EventEmitter();

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  selectedMoment =new Date();
  public min = new Date();
    // public labels: Label[] = [];
  public newLabels: Label[] = [];


  constructor(private noteService: NoteService, private snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit() {
    console.log(this.message);
  }

  public openDialog(note): void {
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

  public addNoteLabel(data) {
    this.updateNoteEvent.emit(data);
  }

  public moveToTrash(key, note) {
    note.inTrash = 1;
    const data = { key, note };
    this.updateNoteEvent.emit(data);
  }

  public updateArchiveNote(key, note) {
    note.archive = key === 'archive' ? 1 : 0;
    note.pinned = 0;
    const data = { key, note };
    this.updateNoteEvent.emit(data);
  }

  public pinned(key, note) {
    note.pinned = key === 'pinned' ? 1 : 0;
    const data = { key, note };
    this.updateNoteEvent.emit(data);
  }

  public removeLabel(label, note) {
    this.noteService.removeLabelFromNote(note.noteId, label.labelId).subscribe(response => {
      console.log("deleting check in database");
      const data = { note };
      this.updateNoteEvent.emit(data);
    }, (error) => console.log(error));
  }

  public dailogCollaborator(note) {
    const dialogRef = this.dialog.open(CollaboratorComponent, {
      width: '500px',
      data: note
    });
    dialogRef.afterClosed().subscribe(result => {
      const data = { note }
      this.updateNoteEvent.emit(data);
      console.log('The dialog was closed');
    });
  }

  public updateColor(data) {
    this.updateNoteEvent.emit(data);
  }

  public saveRemainder(selectedMoment,note)
  {
    note.remainder=selectedMoment;
    console.log(note.remainder);
    const data = { note }
    this.updateNoteEvent.emit(data);
  }

  public removeRemainder(note)
  {
    note.remainder=null;
    console.log(note.remainder);
    const data = { note }
    this.updateNoteEvent.emit(data);
  }
}
