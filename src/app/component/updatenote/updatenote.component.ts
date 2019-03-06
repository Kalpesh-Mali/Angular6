import { Component, OnInit, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { NoteService } from 'src/app/core/service/note.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Note } from 'src/app/core/models/note';

@Component({
  selector: 'app-updatenote',
  templateUrl: './updatenote.component.html',
  styleUrls: ['./updatenote.component.css']
})
export class UpdatenoteComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  constructor(public dialogRef: MatDialogRef<UpdatenoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Note, private noteService: NoteService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  closeClick(newNote) {
    console.log(newNote.title);
    console.log(newNote.description);
    this.noteService.updateNote(newNote, newNote.noteId).subscribe(response => {
      console.log(response);
    },
      error => {
        console.log("error");
      })
    this.dialogRef.close();
  }
  moveToTrash(note) {
    note.inTrash = 1;
    console.log(note);
    this.noteService.updateNote(note, note.noteId).subscribe(response => {
      console.log(response);
      this.snackBar.open("moved to trash", "Ok", { duration: 2000 });
    },
      error => {
        console.log("error");
      })
  }

  removeLabel(label, note) {
    this.noteService.removeLabelFromNote(note.noteId, label.labelId).subscribe(response => {
      console.log("deleting check in database");
      this.dialogRef.close();
    }, (error) => console.log(error));
  }

}