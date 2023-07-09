import { Injectable } from '@nestjs/common';
import { USChangeCalculatorService } from 'src/changecalculator/changecalculator.service';

@Injectable()
export class KeepTheChangeService {
  constructor(private readonly changeCalculator: USChangeCalculatorService) {}

  getCurrency(
    amount: number,
    paid: number,
    divider: number,
    availableChange: number[],
  ): string {
    const diff = paid - amount;
    const smu = '';

    if (diff % divider == 0) return 'Smu ' + diff + ' fleh';
    else {
      const changeArray = this.changeCalculator.getChange(diff);
      let currencyString = '';

      for (let i = 0; i < changeArray.length; i++) {
        if (i > 0) currencyString += ',';
        currencyString += changeArray[i].toString();
      }

      return currencyString.trim();
    }
  }
}
