import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {

  transform(value: string | undefined): string {
    try {
      if (!value) {
        return '';
      }

      let hours = parseInt(value.slice(0, 2));
      let minutes = parseInt(value.slice(3));
      let str = "";

      if (isNaN(hours) || isNaN(minutes)) {
        throw new Error('Hours and minutes must not be letters.');
      }
      if (value.charAt(2) !== ":") {
        throw new Error('Time must be in 24-hr format: 00:00');
      }
      if (hours < 0 || hours > 23) {
        throw new Error('Hours must be 0-23.');
      }
      if (minutes < 0 || minutes > 59) {
        throw new Error('Minutes must be 0-59.');
      }

      let indicator = 'PM';
      if (hours < 12) {
        indicator = 'AM';
      }
      if (hours >= 13) {
        hours -= 12;
      }
      if (hours === 0) {
        hours = 12;
      }
      str += hours + ":";


      if (minutes < 10) {
        str += "0";
      }
      str += minutes + " ";
      str += indicator;

      return str;
    } catch (e) {
      throw e;
    }

  }

}
