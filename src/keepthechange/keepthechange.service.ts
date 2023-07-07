import { Injectable } from '@nestjs/common';

@Injectable()
export class KeepTheChangeService {
  getCurrency(
    amount: number,
    paid: number,
    divider: number,
    availableChange: number[],
  ): string {
    let diff = paid - amount;
    let smu = '';

    if (diff % divider == 0) return 'Smu ' + diff + ' fleh';
    else {
      for (let i = 0; i < availableChange.length; i++) {
        if (diff >= availableChange[i]) {
          const count = Math.floor(diff / availableChange[i]);
          smu += count + ' ' + availableChange[i] + ' ';
          diff -= count * availableChange[i];
        }
      }

      return smu;
    }
  }
}
