import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Note } from 'src/app/core/models/note';
import { NoteService } from 'src/app/core/service/note.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Subject } from 'rxjs';
import { HelperServiceService } from 'src/app/core/service/helper-service.service';
import { UserService } from 'src/app/core/service/user.service';
import { User } from 'src/app/core/models/user';
import { DomSanitizer } from '@angular/platform-browser';
import { useAnimation } from '@angular/animations';
import { ImageComponent } from '../image/image.component';

interface ImageData {
  imageSrc: any;
}

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})

export class WelcomeComponent implements OnInit {

  public grid = false;
  public hide = true;
  public user
  public dynamicBind: Note;
  public searchString = '';
  public imageData = <ImageData>{};
  public toggleNav: Subject<any> = new Subject();


  constructor(private router: Router, private noteService: NoteService, private snackBar: MatSnackBar,
    private userService: UserService, private dailog: MatDialog,
    private helperService: HelperServiceService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.getImage();
  }

  getImage() {
    this.userService.downloadImage().subscribe(resp => {
      this.user = resp;
      console.log(this.user)
      if (this.user.profilePicture != null) {
        const url = `data:${this.user.contentType};base64,${this.user.profilePicture}`;
        this.imageData = {
          imageSrc: this.sanitizer.bypassSecurityTrustUrl(url)
        }
      }
      else {
        this.imageData.imageSrc = null;
      }
    }, error => {
      console.log("error")
    }
    )
  }

  openDialog(): void {
    const dialogRef = this.dailog.open(ImageComponent, {
      width: '500px',
      data: ''
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getImage();
      console.log('The dialog was closed');
    });
  }

  public toggle() {
    this.toggleNav.next();
    console.log(this.toggleNav);
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

  // public test() {
  //   var numbers = ['delhi', 'kkp', 'hai', 'delhi', 'hai', 'nope'];
  //   var newNumbers = numbers.filter((number, index) => {
  //     return index == numbers.indexOf(number);
  //   });
  //   console.log(newNumbers);
  // }

  // public test2() {
  //   var numbers = ['delhi', 'kkp', 'hai', 'nope'];
  //   var value = 'delhi';
  //   console.log(numbers.some((item) => item === value));
  // }

  public searchtest() {
    this.helperService.setSearch(this.searchString);
    this.router.navigate(['welcome/search'])
  }

  clearSearch() {
    this.searchString = '';
    this.router.navigate(['welcome/main-notes'])
  }

}
