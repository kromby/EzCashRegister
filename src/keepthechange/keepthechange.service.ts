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

  calculateChange(input: string, divider: number): string {
    this.loggerService.log('input: ' + input, 'KeepTheChangeService');
    let lines = input.split('\r\n');
    this.loggerService.log(
      'lines count r-n: ' + lines.length,
      'KeepTheChangeService',
    );
    if (lines.length < 2) {
      lines = input.split('\n');
      this.loggerService.log(
        'lines count n: ' + lines.length,
        'KeepTheChangeService',
      );
    }
    if (lines.length < 2) {
      lines = input.split('\r');
      this.loggerService.log(
        'lines count r: ' + lines.length,
        'KeepTheChangeService',
      );
    }
    this.loggerService.log('lines: ' + lines, 'KeepTheChangeService');
    let output = '';

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      this.loggerService.log('line: ' + line, 'KeepTheChangeService');
      const values = line.split(',');

      if (values.length === 2) {
        output +=
          this.getCurrency(
            new Decimal(values[0].trim()),
            new Decimal(values[1].trim()),
            divider,
          ) + '\n';
      }
    }

    return output;
  }

  getCurrency(amount: Decimal, paid: Decimal, divider: number): string {
    const diff = paid.minus(amount);
    this.loggerService.log(
      'getCurrency amount: ' + amount,
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
