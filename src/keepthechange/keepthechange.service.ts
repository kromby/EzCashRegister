import { Injectable } from '@nestjs/common';
import {
  USChangeCalculatorService,
  USRandomChangeCalculatorService,
} from '../changecalculator/changecalculator.service';
import Decimal from 'decimal.js';
import { LoggerService } from '../logger/logger.service';
import { CurrencyEntity } from '../entity/currency.entity';

@Injectable()
export class KeepTheChangeService {
  constructor(
    private readonly changeCalculator: USChangeCalculatorService,
    private readonly randomChangeCalculator: USRandomChangeCalculatorService,
    private readonly loggerService: LoggerService,
  ) {}

  getCurrency(amount: Decimal, paid: Decimal, divider: number): string {
    const diff = paid.minus(amount);
    this.loggerService.log(
      'getCurrency amount: ' + amount,
      'KeepTheChangeService',
    );
    this.loggerService.log(
      'getCurrency divider: ' + divider,
      'KeepTheChangeService',
    );
    this.loggerService.log(
      'getCurrency diff.mod(divider): ' +
        amount.mul(100).mod(new Decimal('3.0')),
      'KeepTheChangeService',
    );

    let changeArray: CurrencyEntity[] = [];

    // .mul(100) is because a fractional number is not divisible by a whole number
    if (amount.mul(100).mod(divider).eq(0)) {
      changeArray = this.randomChangeCalculator.getChange(diff);
    } else {
      changeArray = this.changeCalculator.getChange(diff);
    }

    let currencyString = '';

    for (let i = 0; i < changeArray.length; i++) {
      if (i > 0) currencyString += ',';
      currencyString += changeArray[i].toString();
    }

    return currencyString.trim();
  }
}
