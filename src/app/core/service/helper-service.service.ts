import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Label } from '../models/label';

@Injectable({
  providedIn: 'root'
})
export class HelperServiceService {
  public theme$: Subject<any> = new Subject();
  public labels$:Label[];
  public search$: Subject<any> = new Subject();
  
  constructor() { }

  public setTheme(themeChanged: boolean) {
    this.theme$.next(themeChanged);
  }

  public getTheme() {
    return this.theme$;
  }

  // public setLabels(labels:Label[])
  // {
  //   this.labels$=labels;
  // }

  // public getLabels()
  // {
  //   return this.labels$;
  // }

  public setSearch(search: string) {
    this.search$.next(search);
  }

  public getSearch() {
    return this.search$;
  }
}
