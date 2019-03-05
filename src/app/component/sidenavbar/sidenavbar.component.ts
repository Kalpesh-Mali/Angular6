import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { EditLabelsComponent } from '../edit-labels/edit-labels.component';
import { NoteService } from 'src/app/core/service/note.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Label } from 'src/app/core/models/label';

@Component({
  selector: 'app-sidenavbar',
  templateUrl: './sidenavbar.component.html',
  styleUrls: ['./sidenavbar.component.css']
})
export class SidenavbarComponent implements OnInit {
  @ViewChild('drawer') public drawer;
  @Input() public toggleSidebar: Subject<any>;

  public labels: Label[] = [];

  constructor(private router: Router, private noteService: NoteService, private snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.getLabels();
    this.toggleSidebar.subscribe(event => {
      if (this.drawer) {
        this.drawer.toggle();
      }
    });
  }

  public navigateTo(path) {
    this.router.navigate([path]);
  }

  editLabel(): void {
    const dialogRef = this.dialog.open(EditLabelsComponent, {
      width: '500px',
      data: ''
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
      console.log('The dialog was closed');
    });
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
