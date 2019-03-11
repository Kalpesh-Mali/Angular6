import { Component, OnInit, Input } from '@angular/core';
import { HelperServiceService } from 'src/app/core/service/helper-service.service';
import { Note } from 'src/app/core/models/note';
import { NoteService } from 'src/app/core/service/note.service';
import { MatSnackBar, MatDialog } from '@angular/material';

@Component({
  selector: 'app-search-note',
  templateUrl: './search-note.component.html',
  styleUrls: ['./search-note.component.css']
})
export class SearchNoteComponent implements OnInit {

  public notes: Note[] = [];
  public grid = false;
  public searchString = '';

  constructor(private noteService: NoteService, private snackBar: MatSnackBar,
    public dialog: MatDialog, private helperService: HelperServiceService) { }

  ngOnInit() {
    this.getNotes();
    this.helperService.getTheme().subscribe((resp) =>
      this.grid = resp
    );
    this.helperService.getSearch().subscribe((resp) =>
      this.searchString = resp);
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
    }, error => {
      this.snackBar.open("error", "error to retrieve notes", { duration: 2000 });
    }
    )
  }

}
