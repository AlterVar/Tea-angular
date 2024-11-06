import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutDescription'
})
export class CutDescriptionPipe implements PipeTransform {

  transform(description: string): string {
    if (description.length > 115) {
      return description.slice(0,115) + '...'
    } else {
      return description;
    }
  }

}
