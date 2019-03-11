import { Pipe, PipeTransform } from '@angular/core';
import { Note } from '../core/models/note';

@Pipe({
  name: 'searchNotes'
})
export class SearchNotesPipe implements PipeTransform {

  transform(notes: Note[], searchValue: any): any {
    console.log(notes, searchValue);
    if (!searchValue) {
      return null;
    }
    else {
      return notes.filter(({ title }) => {
        return title.includes(searchValue);
      });
    }
  }

}
