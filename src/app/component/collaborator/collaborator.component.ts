import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from 'src/app/core/service/user.service';
import { User } from 'src/app/core/models/user';
import { error } from 'util';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Note } from 'src/app/core/models/note';
import { DomSanitizer } from '@angular/platform-browser';

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

  constructor(private userService: UserService, public dialogRef: MatDialogRef<CollaboratorComponent>,
    @Inject(MAT_DIALOG_DATA) public note: Note,
    private snackBar: MatSnackBar,private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.getImage();
  }

  collaborate(user, emailId) {
    console.log(emailId);
    console.log(user);
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
