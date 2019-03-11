import { Pipe, PipeTransform } from '@angular/core';
import { Label } from '../core/models/label';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(labels: Label[], searchValue: any): any {
    console.log(labels, searchValue);
    if (!searchValue) {
      return labels;
    }
    else {
      return labels.filter(({ labelName }) => {
        return labelName.includes(searchValue);
      });
    }
  }

}
