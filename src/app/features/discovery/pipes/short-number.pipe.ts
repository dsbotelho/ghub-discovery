import { Pipe, PipeTransform } from '@angular/core';

/**
 * This code was shamefully copied and adapted from: https://gist.github.com/shifatul-i/69a2c247a414482e445b1c324b01134b
 */
@Pipe({
  name: 'shortNumber',
})
export class ShortNumberPipe implements PipeTransform {
  transform(number: number): number | string {
    if (isNaN(number)) return '-';
    if (number === null) return '-';
    if (number < 1000) return number;

    const rounder = Math.pow(10, 1);
    let key = '';

    const powers = [
      { key: 'M', value: Math.pow(10, 6) },
      { key: 'k', value: 1000 },
    ];

    for (let i = 0; i < powers.length; i++) {
      let reduced = number / powers[i].value;
      reduced = Math.round(reduced * rounder) / rounder;

      if (reduced >= 1) {
        number = reduced;
        key = powers[i].key;
        break;
      }
    }

    return number.toFixed(0) + key;
  }
}
