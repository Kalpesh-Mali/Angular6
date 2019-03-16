import { Component, OnInit, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { NoteService } from 'src/app/core/service/note.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Note } from 'src/app/core/models/note';

@Component({
  selector: 'app-updatenote',
  templateUrl: './updatenote.component.html',
  styleUrls: ['./updatenote.component.scss']
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
    this.updateNote(newNote);
  }

  moveToTrash(note) {
    note.inTrash = 1;
    console.log(note);
    this.updateNote(note);
  }

  updateArchiveNote(key, data) {
    data.archive = key === 'archive' ? 1 : 0;
    data.pinned = 0;
    this.updateNote(data);
  }

  pinned(key, note) {
    note.pinned = key === 'pinned' ? 1 : 0;
    this.updateNote(note);
  }

  updateNote(newNote) {
    this.noteService.updateNote(newNote, newNote.noteId).subscribe(response => {
      console.log(response);
      this.dialogRef.close();
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

  addNoteLabel(data) {
    this.updateNote(data.note);
  }

  updateColor(data)
  {
    this.updateNote(data.note);
  }

  //   public onClickCkeckbox(event, label, note) {
  //   event.stopPropagation();
  //   this.noteService.addLabelToNote(note.noteId, label).subscribe(response => {
  //     console.log("adding check in database");
  //     const data = { note };
  //     this.getNotes();
  //   }, (error) => console.log(error));
  // }

  // public getLabels() {
  //   this.noteService.retrieveLabels().subscribe(newLabel => {
  //     this.labels = newLabel;
  //     console.log(this.labels);
  //   }, error => {
  //     this.snackBar.open("error", "error to retrieve labels", { duration: 2000 });
  //   }
  //   )
  // }

  // public labelFilter(event, noteLabels) {
  //   event.stopPropagation();
  //   this.newLabels.length = 0;
  //   var k = 0;
  //   for (var i = 0; i < this.labels.length; i++) {
  //     var present = 0;
  //     for (var j = 0; j < noteLabels.length; j++) {
  //       if (this.labels[i].labelId === noteLabels[j].labelId && present === 0) {
  //         present = 1;
  //       }
  //     }
  //     if (present === 0) {
  //       this.newLabels[k] = this.labels[i];
  //       k++;
  //     }
  //   }
  // }



}