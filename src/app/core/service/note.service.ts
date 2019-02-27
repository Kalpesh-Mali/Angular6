import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {


  constructor(private httpUtil: HttpService, private router: Router, public snackBar: MatSnackBar) { }

  retrieveNotes(): Observable<any> {
    var token = localStorage.getItem('token');
    var httpheaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    };
    return this.httpUtil.getService(environment.note_url + 'retrievenote', httpheaders);
  }

  createNote(note): Observable<any> {
    var token = localStorage.getItem('token');
    var httpheaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    };
    return this.httpUtil.postServiceForNoteCreate(environment.note_url + 'createnote', httpheaders, note);
  }


  updateNote(note)
  {
    var token = localStorage.getItem('token');
    var httpheaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    };
    return this.httpUtil.putServiceForNoteUpdate(environment.note_url + 'updatenote',note,httpheaders);
  }

  deleteNote(note)
  {
    var token = localStorage.getItem('token');
    var httpheaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    };
    return this.httpUtil.deleteServiceForNoteDelete(environment.note_url + 'deletenote',note,httpheaders);
  }
}
