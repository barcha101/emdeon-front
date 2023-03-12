import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials'
})
export class InitialsPipe implements PipeTransform {

  transform(name: string): string {
    return name && name.trim() && name.trim().length ? name.trim()[0].toUpperCase() : '';
  }

}
