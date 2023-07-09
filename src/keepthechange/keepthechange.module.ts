import { Module } from '@nestjs/common';
import { KeepTheChangeService } from './keepthechange.service';
import {
  USChangeCalculatorService,
  USRandomChangeCalculatorService,
} from '../changecalculator/changecalculator.service';
import { LoggerService } from '../logger/logger.service';

@Module({
  providers: [
    KeepTheChangeService,
    USChangeCalculatorService,
    USRandomChangeCalculatorService,
    LoggerService,
  ],
  exports: [KeepTheChangeService],
})
export class KeepTheChangeModule {}
