import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpUtil: HttpService, private router: Router, public snackBar: MatSnackBar) { }

  login(user) {
    return this.httpUtil.postService(environment.base_url + 'login', user);
  }

  register(user) {
    return this.httpUtil.postService(environment.base_url + 'register', user);
  }

  forgotPassword(user) {
    return this.httpUtil.postService(environment.base_url + 'forgotpassword', user);
  }

  resetPassword(user, id) {
   return this.httpUtil.putService(environment.base_url + 'resetpassword/'+id, user, id);
  }
}
