import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {

  transform(value: String | undefined): string {
    if(!value) {
      return '';
    }
    let str = "";
    let hours = parseInt(value.slice(0, 2));
    let minutes = parseInt(value.slice(3));

    let indicator = 'PM';
    if(hours < 12) {
      indicator = 'AM';
    }
    if (hours >= 13) {
      hours -= 12;
    }
    if (hours === 0) {
      hours = 12;
    }
    str += hours + ":";


    if(minutes < 10){
      str += "0";
    }
    str += minutes + " ";
    str += indicator;

    return str;
  }

}
