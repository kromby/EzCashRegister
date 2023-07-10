import { Test } from '@nestjs/testing';
import {
  BaseChangecalculatorService,
  USChangeCalculatorService,
  USRandomChangeCalculatorService,
} from './changecalculator.service';
import { LoggerService } from '../logger/logger.service';
import Decimal from 'decimal.js';

describe('AppController', () => {
  let changeCalculatorService: USChangeCalculatorService;
  let randomChangeCalculatorService: USRandomChangeCalculatorService;

  beforeEach(async () => {
    const modfuleRef = await Test.createTestingModule({
      providers: [
        USChangeCalculatorService,
        USRandomChangeCalculatorService,
        LoggerService,
      ],
    }).compile();

    changeCalculatorService = modfuleRef.get<BaseChangecalculatorService>(
      USChangeCalculatorService,
    );

    randomChangeCalculatorService = modfuleRef.get<BaseChangecalculatorService>(
      USRandomChangeCalculatorService,
    );
  });

  describe('getChange 0.88', () => {
    it('should return "3 quarters,1 dime,3 pennies"', () => {
      const result = changeCalculatorService.getChange(
        new Decimal('3').minus(new Decimal('2.12')),
      );

      expect(result.length).toBe(3);
      expect(result[0].count).toBe(3);
      expect(result[1].count).toBe(1);
      expect(result[2].count).toBe(3);
    });
  });

  describe('getChange 0.03', () => {
    it('should return "3 pennies"', () => {
      const result = changeCalculatorService.getChange(
        new Decimal('2').minus(new Decimal('1.97')),
      );

      expect(result.length).toBe(1);
      expect(result[0].count).toBe(3);
    });
  });

  describe('getChange random', () => {
    it('should return random', () => {
      const result = randomChangeCalculatorService.getChange(
        new Decimal('5').minus(new Decimal('3.33')),
      );

      let total = new Decimal('0');
      for (let i = 0; i < result.length; i++) {
        total = total.plus(result[i].amount.mul(result[i].count));
      }
      expect(total.toNumber()).toBe(1.67);
    });
  });
});
