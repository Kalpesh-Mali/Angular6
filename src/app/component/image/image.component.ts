import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NoteService } from 'src/app/core/service/note.service';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from 'src/app/core/service/user.service';
import { HelperServiceService } from 'src/app/core/service/helper-service.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  selectedFiles: FileList;
  currentFileUpload: File;

  constructor(private router: Router,
    private userService: UserService,
    private helperService: HelperServiceService,
    public dialogRef: MatDialogRef<ImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.currentFileUpload = this.selectedFiles.item(0);
    this.userService.uploadImage(this.currentFileUpload).subscribe(event => {
      this.snackBar.open("image uploaded", "ok", { duration: 2000 });
      this.dialogRef.close();
    });
  }
  close() {
    this.dialogRef.close();
  }

  removeImage()
  {
    this.userService.removeImage().subscribe(event => {
      this.snackBar.open("image removed", "ok", { duration: 2000 });
      this.dialogRef.close();
    });
  }

}
