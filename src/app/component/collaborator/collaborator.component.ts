import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from 'src/app/core/service/user.service';
import { User } from 'src/app/core/models/user';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Note } from 'src/app/core/models/note';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NoteService } from 'src/app/core/service/note.service';

interface ImageData {
  imageSrc: any;
}

@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.scss']
})
export class CollaboratorComponent implements OnInit {

  public user;
  public emailId = '';
  public imageData = <ImageData>{};
  public myControl = new FormControl();
  public users: User[] = [];

  constructor(private userService: UserService, public dialogRef: MatDialogRef<CollaboratorComponent>,
    @Inject(MAT_DIALOG_DATA) public note: Note,
    private snackBar: MatSnackBar, private sanitizer: DomSanitizer,
    private noteService:NoteService) { }

  ngOnInit() {
    this.getImage();
    this.getUsers();
  }

  public getUsers() {
    this.userService.getUsers().subscribe(({body}) => {
      this.users = body;
      console.log(this.users)
    }
      , error => console.log("error"));
  }

  collaborate(emailId) {
    // console.log(user);
    this.userService.verifyEmail(emailId).subscribe(user => {
      console.log(user.id);
      console.log(this.note.noteId);
      this.snackBar.open("emailId verified", "ok", { duration: 2000 });
      this.noteService.createCollaborator(this.note.noteId,user.id).subscribe(resp=>
        this.snackBar.open("added to collaborator", "ok", { duration: 2000 })
        )
    }, error => console.log(error));
  }

  closeClick() {
    this.dialogRef.close();
  }

  getImage() {
    this.userService.downloadImage().subscribe(resp => {
      this.user = resp
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
      this.snackBar.open("error to download image", "error", { duration: 2000 });
    }
    )
  }

}


// myControl = new FormControl();
// options: string[] = ['One', 'Two', 'Three'];
// filteredOptions: Observable<string[]>;

// ngOnInit() {
//   this.filteredOptions = this.myControl.valueChanges
//     .pipe(
//       startWith(''),
//       map(value => this._filter(value))
//     );
// }

//   private _filter(value: string): string[] {
//   const filterValue = value.toLowerCase();

//   return this.options.filter(option => option.toLowerCase().includes(filterValue));
// }
// }