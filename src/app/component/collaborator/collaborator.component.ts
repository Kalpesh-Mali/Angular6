import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from 'src/app/core/service/user.service';
import { User } from 'src/app/core/models/user';
import { error } from 'util';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Note } from 'src/app/core/models/note';

@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.scss']
})
export class CollaboratorComponent implements OnInit {

  public user;
  public emailId = '';
  constructor(private userService: UserService, public dialogRef: MatDialogRef<CollaboratorComponent>,
    @Inject(MAT_DIALOG_DATA) public note: Note, ) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.userService.colaborator().subscribe(user =>
      this.user = user), error => {
        console.log("error")
      };
  }

  collaborate(user, emailId) {
    console.log(emailId);
    console.log(user);
  }

  closeClick() {
    this.dialogRef.close();
  }

}
