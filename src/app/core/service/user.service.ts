import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpUtil: HttpService, private router: Router) { }

  login(user) {
    this.httpUtil.postService(environment.base_url + 'login', user).subscribe(response => {
      console.log(response);
      if (response.status == 200) {
        console.log("login successful");
        localStorage.setItem('Authorization', response.headers.get('token'));
        console.log(response.headers.get('token'));
        this.router.navigate(['/welcome']);
      }
      else {
        console.log("cannot log in");
      }
    });
  }

  register(user) {
    this.httpUtil.postService(environment.base_url + 'register', user).subscribe(response => {
      console.log(response);
      if (response.status == 200) {
        console.log("registration successfull");
        this.router.navigate(['/login']);
        localStorage.setItem('Authorization', response.body.headers);
      }
      else {
        console.log("registration failed");
      }
    })
  }
}
