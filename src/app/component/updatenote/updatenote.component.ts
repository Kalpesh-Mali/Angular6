import { Component, OnInit, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog } from '@angular/material';
import { NoteService } from 'src/app/core/service/note.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Note } from 'src/app/core/models/note';
import { CollaboratorComponent } from '../collaborator/collaborator.component';

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
  selectedMoment=new Date();
  min=new Date();

  constructor(public dialogRef: MatDialogRef<UpdatenoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Note, private noteService: NoteService,
    private snackBar: MatSnackBar,private dialog:MatDialog) { }

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

  updateColor(data) {
    this.updateNote(data.note);
  }

  saveRemainder(selectedMoment, note) {
    note.remainder = selectedMoment;
    this.updateNote(note);
  }

  public dailogCollaborator(note) {
    const dialogRef = this.dialog.open(CollaboratorComponent, {
      width: '500px',
      data: note
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}