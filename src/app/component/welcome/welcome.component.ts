import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Note } from 'src/app/core/models/note';
import { NoteService } from 'src/app/core/service/note.service';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  grid = 0;
  hide = true;
  public dynamicBind: Note;
  public toggleNav: Subject<any> = new Subject();

  constructor(private router: Router, private noteService: NoteService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  public toggle() {
    this.toggleNav.next();
  }

  public getNotes() {
    this.noteService.retrieveNotes().subscribe(newNote => {
      this.dynamicBind = newNote;
    }, error => {
      this.snackBar.open("error", "error to retrieve notes", { duration: 2000 });
    }
    )
  }

  public logout() {
    localStorage.removeItem('token')
    this.router.navigate(['/login']);
  }

  viewList() {
    this.grid = 1;
  }
  viewGrid() {
    this.grid = 0;
  }

}
