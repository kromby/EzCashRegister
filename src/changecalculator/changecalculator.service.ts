import { Injectable } from '@nestjs/common';
import { CurrencyEntity } from 'src/entity/currency.entity';

@Injectable()
export abstract class BaseChangecalculatorService {
  divider: number;
  availableCurrency: CurrencyEntity[];

  constructor() {
    this.divider = 3;
    this.availableCurrency = [
      new CurrencyEntity('dollar', 'dollars', 1, 1000),
      new CurrencyEntity('quarter', 'quarters', 0.25, 1000),
      new CurrencyEntity('dime', 'dimes', 0.1, 1000),
      new CurrencyEntity('penny', 'pennies', 0.01, 1000),
    ];
  }

  abstract getChange(change: number): CurrencyEntity[];
}

@Injectable()
export class USChangeCalculatorService extends BaseChangecalculatorService {
  getChange(change: number): CurrencyEntity[] {
    const changeArray: CurrencyEntity[] = [];

    for (let i = 0; i < this.availableCurrency.length; i++) {
      if (change >= this.availableCurrency[i].amount) {
        const count = Math.floor(change / this.availableCurrency[i].amount);
        const currency = this.availableCurrency[i];
        currency.count = count;
        changeArray.push(currency);
        change -= count * this.availableCurrency[i].amount;

        // TODO: Check if there is enough available currency.
      }
    }

    return changeArray;
  }
}

@Injectable()
export class USRandomChangeCalculatorService extends BaseChangecalculatorService {
  getChange(change: number): CurrencyEntity[] {
    return null;
  }
}
