import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Label } from 'src/app/core/models/label';
import { NoteService } from 'src/app/core/service/note.service';
import { MatSnackBar, MatDialog } from '@angular/material';

@Component({
  selector: 'app-add-note-labels',
  templateUrl: './add-note-labels.component.html',
  styleUrls: ['./add-note-labels.component.css']
})
export class AddNoteLabelsComponent implements OnInit {

  @Input() note
  @Output() eventAddNoteLabel = new EventEmitter();
  public labels: Label[] = [];
  public newLabels: Label[] = [];

  constructor(private noteService: NoteService, private snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.getLabels();
  }

  public onClickCheckbox(event, label, note) {
    event.stopPropagation();
    this.noteService.addLabelToNote(note.noteId, label).subscribe(response => {
      console.log("adding check in database");
      const data = { note };
      // this.getNotes();
      this.eventAddNoteLabel.emit(data);
    }, (error) => console.log(error));
  }

  public getLabels() {
    this.noteService.retrieveLabels().subscribe(newLabel => {
      this.labels = newLabel;
      console.log(this.labels);
    }, error => {
      this.snackBar.open("error", "error to retrieve labels", { duration: 2000 });
    }
    )
  }

  public labelFilter(event, noteLabels) {
    event.stopPropagation();
    this.newLabels.length = 0;
    var k = 0;
    for (var i = 0; i < this.labels.length; i++) {
      var present = 0;
      for (var j = 0; j < noteLabels.length; j++) {
        if (this.labels[i].labelId === noteLabels[j].labelId && present === 0) {
          present = 1;
        }
      }
      if (present === 0) {
        this.newLabels[k] = this.labels[i];
        k++;
      }
    }
  }

}
