import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { NoteService } from 'src/app/core/service/note.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { HelperServiceService } from 'src/app/core/service/helper-service.service';
import { Note } from 'src/app/core/models/note';
import { Label } from 'src/app/core/models/label';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.css']
})
export class LabelsComponent implements OnInit {


  public grid = false;
  public notes: Note[] = [];
  public newNotes: Note[] = [];
  public label;


  constructor(private noteService: NoteService, private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    public dialog: MatDialog, private helperService: HelperServiceService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.label = params['labelName'];
      this.helperService.getTheme().subscribe((resp) =>
        this.grid = resp
      );
      this.getNotes();
    });
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
    this.newNotes.length = 0;
    notes.filter((note) => note.labels.filter((label) => {
      if (this.label === label.labelName && !note.inTrash) {
        this.newNotes.push(note);
      }
    }))
  }
}
