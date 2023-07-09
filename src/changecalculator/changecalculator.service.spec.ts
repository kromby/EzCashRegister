import { Test } from '@nestjs/testing';
import {
  BaseChangecalculatorService,
  USChangeCalculatorService,
} from './changecalculator.service';
import { LoggerService } from '../logger/logger.service';
import Decimal from 'decimal.js';

describe('AppController', () => {
  let changeCalculatorService: USChangeCalculatorService;

  beforeEach(async () => {
    const modfuleRef = await Test.createTestingModule({
      providers: [USChangeCalculatorService, LoggerService],
    }).compile();

    changeCalculatorService = modfuleRef.get<BaseChangecalculatorService>(
      USChangeCalculatorService,
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
  
  describe('getChange', () => {
    it('should return "3 pennies"', () => {
      const result = changeCalculatorService.getChange(
        new Decimal('2').minus(new Decimal('1.97')),
      );

      expect(result.length).toBe(1);
      expect(result[0].count).toBe(3);
    });
  });  
});
