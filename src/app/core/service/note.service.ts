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
  public httpheaders() {
    // console.log("localStorage.getItem('token')::", localStorage.getItem('token'));
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      })
    }
  };

  constructor(private httpUtil: HttpService, private router: Router, public snackBar: MatSnackBar) { }

  retrieveNotes(): Observable<any> {
    return this.httpUtil.getService(environment.note_url + 'retrievenote', this.httpheaders());
  }

  createNote(note): Observable<any> {
    return this.httpUtil.postForNoteCreate(environment.note_url + 'createnote', this.httpheaders(), note);
  }


  updateNote(note, id) {
    return this.httpUtil.putForNoteUpdate(environment.note_url + 'updatenote/' + id, note, this.httpheaders());
  }

  deleteNote(id) {
    return this.httpUtil.deleteForNoteDelete(environment.note_url + 'deletenote/' + id, this.httpheaders());
  }

  retrieveLabels(): Observable<any> {
    return this.httpUtil.getService(environment.note_url + 'retrievelabel', this.httpheaders());
  }

  updateLabel(label, id) {
    return this.httpUtil.putForLabelUpdate(environment.note_url + 'updatelabel/' + id, label, this.httpheaders());
  }

  deleteLabel(id) {
    return this.httpUtil.deleteForLabelDelete(environment.note_url + 'deletelabel/' + id, this.httpheaders());
  }

  createLabel(label): Observable<any> {
    return this.httpUtil.postForLabelCreate(environment.note_url + 'createlabel', label, this.httpheaders());
  }

  removeLabelFromNote(noteId, labelId) {
    return this.httpUtil.deleteForRemoveLabelFromNote(`${environment.note_url}removenotelabel/`, {
      params: {
        noteId: noteId,
        labelId: labelId,
      },
      observe: 'response'
    }
    )
  }

  addLabelToNote(noteId, label) {
    return this.httpUtil.addForAddLabelFromNote(`${environment.note_url}addnotelabel/` + noteId, label
    )
  }

  createCollaborator(noteId, userId) {
    return this.httpUtil.postForCollaborator(`${environment.note_url}createcollaborator/` + noteId + '/' + userId, this.httpheaders()
    )
  }

  removeCollaborateUser(noteId, userId) {
    return this.httpUtil.removeCollaborateUser(`${environment.note_url}removecollaborator/` + userId + '/' + noteId);
  }

  addImage(file, noteId) {
    const formdata = new FormData();
    formdata.append("file", file);
    return this.httpUtil.postForAddImage(environment.note_url + 'photo/' + noteId, formdata, {
      reportProgress: true,
      responseType: 'text'
    })
  }

  // uploadImage(file): Observable<any> {
  //   const formdata = new FormData();
  //   formdata.append("file", file);
  //   return this.httpUtil.postToUploadImage(environment.base_url + 'photo/' + this.token, formdata, {
  //     reportProgress: true,
  //     responseType: 'text'
  //   }
  //   );
  // }
}
