import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UpdatenoteComponent } from '../updatenote/updatenote.component';
import { NoteService } from 'src/app/core/service/note.service';
import { MatSnackBar, MatDialog } from '@angular/material';

@Component({
  selector: 'app-retrive-notes',
  templateUrl: './retrive-notes.component.html',
  styleUrls: ['./retrive-notes.component.css']
})
export class RetriveNotesComponent implements OnInit {
  @Input() notes

  @Output() eventRetrive = new EventEmitter();

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

}
