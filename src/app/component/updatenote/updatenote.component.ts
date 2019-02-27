import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { NoteService } from 'src/app/core/service/note.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-updatenote',
  templateUrl: './updatenote.component.html',
  styleUrls: ['./updatenote.component.css']
})
export class UpdatenoteComponent implements OnInit {

  updateNoteForm: FormGroup;
  constructor(public dialogRef: MatDialogRef<UpdatenoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private noteService: NoteService,
    private snackBar:MatSnackBar) { }

  ngOnInit() {
  }


  closeClick(title, description) {
    var note = {
      "title": title,
      "description": description,
      "noteId": this.data.noteId
    }
    console.log(title);
    console.log(description);
    this.noteService.updateNote(note).subscribe(response => {
      console.log(response);
    },
      error => {
        console.log("error");
      })
  }
  deleteNote(note) {
    console.log(note.noteId);
    this.noteService.deleteNote(note).subscribe(response => {
      this.snackBar.open("deleted Note", "OK", { duration: 2000 });
    }), error => {
      this.snackBar.open("error", "error to retrieve notes", { duration: 2000 });
    }
  }

}