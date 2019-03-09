import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Note } from 'src/app/core/models/note';
import { NoteService } from 'src/app/core/service/note.service';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { HelperServiceService } from 'src/app/core/service/helper-service.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  public grid = false;
  public hide = true;
  public dynamicBind: Note;
  public toggleNav: Subject<any> = new Subject();


  constructor(private router: Router, private noteService: NoteService, private snackBar: MatSnackBar,
    private helperService: HelperServiceService) { }

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

  public viewGrid() {
    this.grid = !this.grid;
    this.helperService.setTheme(this.grid);
  }

  public test() {
    var numbers = ['delhi', 'kkp', 'hai', 'delhi', 'hai', 'nope'];
    var newNumbers = numbers.filter((number, index) => {
      return index == numbers.indexOf(number);
    });
    console.log(newNumbers);
  }

  public test2() {
    var numbers = ['delhi', 'kkp', 'hai', 'nope'];
    var value = 'deli';
    console.log(numbers.some((item) => item === value) );
  }

}
