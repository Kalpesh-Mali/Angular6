import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Note } from 'src/app/core/models/note';
import { NoteService } from 'src/app/core/service/note.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  hide = true;
  public dynamicBind : Note;
  constructor(private router: Router,private noteService:NoteService,private snackBar:MatSnackBar) { }

  ngOnInit() {
  }

  getNotes() {
    this.noteService.retrieveNotes().subscribe(newNote => {
      this.dynamicBind = newNote;
    }, error => {
      this.snackBar.open("error", "error to retrieve notes", { duration: 2000 });
    }
    )
  }

  archive() {
    this.router.navigate(['welcome/archive-notes'])
  }
  notes() {
    this.router.navigate(['welcome/main-notes'])
  }

  logout() {
    localStorage.removeItem('token')
    this.router.navigate(['/login']);
  }

  trashnote()
  {
    this.router.navigate(['welcome/trash-notes'])
  }
  
}
