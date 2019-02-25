import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/service/user.service';
import { HttpService } from 'src/app/core/service/http.service';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  hide = true;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
    private router: Router, private userService: UserService,
    private httpUtil: HttpService, private snackBar:MatSnackBar) {

  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      emailId: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit(user) {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    console.log(user);
    this.userService.login(user).subscribe(response => {
      console.log("login successful");
      localStorage.setItem('Authorization', response.headers.get('token'));
      console.log(localStorage.getItem('Authorization'));
      console.log(response.headers.get('token'));
      this.router.navigate(['/welcome']);
      this.snackBar.open("ok", "Sucess", { duration: 2000 })
    }, error => {
      this.snackBar.open("error", "please enter valid data", { duration: 2000 })
    });
  }
}
