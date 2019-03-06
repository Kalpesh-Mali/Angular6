import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UpdatenoteComponent } from '../updatenote/updatenote.component';
import { NoteService } from 'src/app/core/service/note.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Label } from 'src/app/core/models/label';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-retrive-notes',
  templateUrl: './retrive-notes.component.html',
  styleUrls: ['./retrive-notes.component.css']
})
export class RetriveNotesComponent implements OnInit {
  @Input() notes

  @Output() eventRetrive = new EventEmitter();

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  label = new FormControl();


  public labels: Label[] = [];
  constructor(private noteService: NoteService, private snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.getLabels();
  }
  openDialog(note): void {
    const dialogRef = this.dialog.open(UpdatenoteComponent, {
      width: '500px',
      data: note
    });
    dialogRef.afterClosed().subscribe(result => {
      this.noteService.updateNote(note, note.noteId).subscribe(response => {
        console.log(response);
      }
        ,
        error => {
          console.log("error");
        })
      this.eventRetrive.emit(true);
      console.log('The dialog was closed');
    });
  }


  moveToTrash(note) {
    note.inTrash = 1;
    this.updateMethod(note);
  }

  updateArchiveNote(note) {
    note.archive = 1;
    this.updateMethod(note);
  }

  pinned(note) {
    note.pinned = 1;
    this.updateMethod(note);
  }

  updateMethod(note) {
    this.noteService.updateNote(note, note.noteId).subscribe(response => {
      console.log(response);
    },
      error => {
        console.log("error");
      })
  }

  removeLabel(label, note) {
    this.noteService.removeLabelFromNote(note.noteId, label.labelId).subscribe(response => {
      console.log("deleting check in database");
      this.eventRetrive.emit(true);
    }, (error) => console.log(error));
  }

  public getLabels() {
    this.noteService.retrieveLabels().subscribe(newLabel => {
      this.labels = newLabel;
    }, error => {
      this.snackBar.open("error", "error to retrieve labels", { duration: 2000 });
    }
    )
  }

}
