import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/core/service/note.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { HelperServiceService } from 'src/app/core/service/helper-service.service';
import { Note } from 'src/app/core/models/note';
import { Label } from 'src/app/core/models/label';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.css']
})
export class LabelsComponent implements OnInit {


  public grid = false;
  public notes: Note[] = [];
  public newNotes: Note[] = [];
  public label: Label;


  constructor(private noteService: NoteService, private snackBar: MatSnackBar,
    public dialog: MatDialog, private helperService: HelperServiceService) { }

  ngOnInit() {
    this.helperService.getTheme().subscribe((resp) =>
      this.grid = resp
    );
    this.label = this.helperService.getLabel();
    this.getNotes();
  }

  public onUpdateNote(data) {
    this.updateMethod(data.note);
  }

  updateMethod(note) {
    this.noteService.updateNote(note, note.noteId).subscribe(response => {
      this.getNotes();
    },
      error => {
        console.log("error");
      })
  }

  public getNotes() {
    this.noteService.retrieveNotes().subscribe(newNote => {
      this.notes = newNote;
      this.filterLabel(this.notes);
    }, error => {
      this.snackBar.open("error", "error to retrieve notes", { duration: 2000 });
    }
    )
  }

  public filterLabel(notes) {
    let k = 0;
    for (let i = 0; i < notes.length; i++) {
      for (let j = 0; j < notes[i].labels.length; j++) {
        if (this.label.labelName === notes[i].labels[j].labelName) {
          this.newNotes[k] = notes[i];
          k++;
          break;
        }
      }
    }
  }
}
