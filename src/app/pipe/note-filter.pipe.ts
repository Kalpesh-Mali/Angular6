import { Pipe, PipeTransform } from '@angular/core';
import { Note } from '../core/models/note';

@Pipe({
  name: 'noteFilter'
})
export class NoteFilterPipe implements PipeTransform {

  transform(notes: Note[], valid = ''): Note[] {
    if (!valid) {
      return notes.filter((item) => {
        if (!item.archive && !item.inTrash && !item.pinned) {
          return item;
        }
      });
    }
    // else if (!valid) {
    //   return notes.filter((item) => {
    //     if (item.archive && !item.inTrash && !item.pinned) {
    //       return item;
    //     }
    //   });
    // }
    // else if (!valid) {
    //   return notes.filter((item) => {
    //     if (!item.archive && !item.inTrash && item.pinned) {
    //       return item;
    //     }
    //   });
    // }
    // else if (!valid) {
    //   return notes.filter((item) => {
    //     if (!item.archive && item.inTrash && !item.pinned) {
    //       return item;
    //     }
    //   });
    // }

    // else
    //   return notes.filter((item) => item[valid]);

  }
}
