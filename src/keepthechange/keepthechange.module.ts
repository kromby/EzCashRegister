import { Module } from '@nestjs/common';
import { KeepTheChangeService } from './keepthechange.service';
import { USChangeCalculatorService } from 'src/changecalculator/changecalculator.service';

@Module({
  providers: [KeepTheChangeService, USChangeCalculatorService],
  exports: [KeepTheChangeService],
})
export class KeepTheChangeModule {}
