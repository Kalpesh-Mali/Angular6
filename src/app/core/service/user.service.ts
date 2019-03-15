import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  public token = localStorage.getItem('token');
  public httpheaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'token': this.token
    })
  };

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
    return this.httpUtil.putService(environment.base_url + 'resetpassword/' + id, user, id);
  }

  colaborator(): Observable<any> {
    return this.httpUtil.getService(environment.base_url + 'colaborator', this.httpheaders);
  }

  uploadImage(file): Observable<any> {
    const formdata = new FormData();
    formdata.append("file", file);
    return this.httpUtil.postToUploadImage(environment.base_url + 'photo/' + this.token, formdata, {
      reportProgress: true,
      responseType: 'text'
    }
    );
  }

  downloadImage():Observable<any> {
    return this.httpUtil.getService(environment.base_url + 'photo', this.httpheaders);
  }

  removeImage()
  {
    return this.httpUtil.deleteService(environment.base_url + 'photo',this.httpheaders);
  }

  getUsers():Observable<any>
  {
    return this.httpUtil.getService(environment.base_url + 'allusers',{observe : 'response'})
  }

  verifyEmail(email):Observable<any>
  {
    return this.httpUtil.getUserEmail(environment.base_url + 'verifyemail/'+email,this.httpheaders)
  }
}
