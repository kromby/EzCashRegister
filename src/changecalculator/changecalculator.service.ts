import { Injectable } from '@nestjs/common';
import { CurrencyEntity } from '../entity/currency.entity';
import { LoggerService } from '../logger/logger.service';
import Decimal from 'decimal.js';

@Injectable()
export abstract class BaseChangecalculatorService {
  divider: number;
  availableCurrency: CurrencyEntity[];
  loggerService: LoggerService;

  constructor(loggerService: LoggerService) {
    this.divider = 3;
    this.availableCurrency = [
      new CurrencyEntity('dollar', 'dollars', new Decimal('1'), 1000),
      new CurrencyEntity('quarter', 'quarters', new Decimal('0.25'), 1000),
      new CurrencyEntity('dime', 'dimes', new Decimal('0.1'), 1000),
      new CurrencyEntity('nickel', 'nickels', new Decimal('0.05'), 1000),
      new CurrencyEntity('penny', 'pennies', new Decimal('0.01'), 1000),
    ];
    this.loggerService = loggerService;
  }

  abstract getChange(change: Decimal): CurrencyEntity[];
}

@Injectable()
export class USChangeCalculatorService extends BaseChangecalculatorService {
  getChange(change: Decimal): CurrencyEntity[] {
    this.loggerService.log(
      'getChange change: ' + change,
      'USChangeCalculatorService',
    );
    const changeArray: CurrencyEntity[] = [];

    for (let i = 0; i < this.availableCurrency.length; i++) {
      this.loggerService.log(
        'getChange for loop change: ' + change,
        'USChangeCalculatorService',
      );

      if (change.greaterThanOrEqualTo(this.availableCurrency[i].amount)) {
        const count = change
          .dividedBy(this.availableCurrency[i].amount)
          .floor()
          .toNumber();
        const currency = this.availableCurrency[i];
        currency.count = count;
        changeArray.push(currency);
        change = change.minus(this.availableCurrency[i].amount.mul(count));

        // TODO: Check if there is enough available currency.
      }
    }

    return changeArray;
  }
}

@Injectable()
export class USRandomChangeCalculatorService extends BaseChangecalculatorService {
  getChange(change: Decimal): CurrencyEntity[] {
    const changeArray: CurrencyEntity[] = [];
    for (let i = 0; i < this.availableCurrency.length - 1; i++) {
      this.loggerService.log(
        'getChange change: ' + change,
        'USRandomChangeCalculatorService',
      );

      if (change.greaterThanOrEqualTo(this.availableCurrency[i].amount)) {
        const count = change
          .dividedBy(this.availableCurrency[i].amount)
          .round()
          .toNumber();
        const currency = this.availableCurrency[i];
        const useCount = Math.floor(Math.random() * count);
        if (useCount > 0) {
          currency.count = useCount;
          changeArray.push(currency);
          change = change.minus(this.availableCurrency[i].amount.mul(useCount));
        }
      }
    }

    if (change.greaterThan(0)) {
      const currency =
        this.availableCurrency[this.availableCurrency.length - 1];
      const count = change.dividedBy(currency.amount).floor().toNumber();
      currency.count = count;
      changeArray.push(currency);
      change = change.minus(currency.amount.mul(count));
    }

    return changeArray;
  }
}
