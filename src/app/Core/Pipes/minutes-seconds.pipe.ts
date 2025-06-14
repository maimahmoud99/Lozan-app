import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minutesSeconds'
})
export class MinutesSecondsPipe implements PipeTransform {
  transform(value: number): string {
    if (value == null || value < 0) {
      return '0:00';
    }
    
    const minutes: number = Math.floor(value / 60);
    const seconds: number = value % 60;

    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

    return `${minutes}:${formattedSeconds}`;
  }

}
