import { PipeTransform, Pipe } from '@angular/core';

@Pipe({name: 'vacations'})
export class VacationPipe implements PipeTransform {
  transform(value, args:string[]) : any {
    let vacations = [];
    for (let vacation in value) {
      vacations.push(vacation);
    }
    return vacations;
  }
}