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
  public token = localStorage.getItem('token');
  public httpheaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'token': this.token
    })
  };

  constructor(private httpUtil: HttpService, private router: Router, public snackBar: MatSnackBar) { }

  retrieveNotes(): Observable<any> {
    return this.httpUtil.getService(environment.note_url + 'retrievenote', this.httpheaders);
  }

  createNote(note): Observable<any> {
    return this.httpUtil.postServiceForNoteCreate(environment.note_url + 'createnote', this.httpheaders, note);
  }


  updateNote(note,id) {
    return this.httpUtil.putServiceForNoteUpdate(environment.note_url + 'updatenote/'+id, note, this.httpheaders);
  }

  deleteNote(id) {
    return this.httpUtil.deleteServiceForNoteDelete(environment.note_url + 'deletenote/' + id, this.httpheaders);
  }

  retrieveArchiveNotes(): Observable<any> {
    return this.httpUtil.getService(environment.note_url + 'archivenote', this.httpheaders);
  }
}
