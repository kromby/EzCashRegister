import {
  USChangeCalculatorService,
  USRandomChangeCalculatorService,
} from './changecalculator/changecalculator.service';
import { KeepTheChangeModule } from './keepthechange/keepthechange.module';
import { KeepTheChangeService } from './keepthechange/keepthechange.service';
// import { KeepthechangeModule } from './keepthechange/keepthechange.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerService } from './logger/logger.service';

@Module({
  imports: [KeepTheChangeModule],
  controllers: [AppController],
  providers: [
    USChangeCalculatorService,
    USRandomChangeCalculatorService,
    AppService,
    KeepTheChangeService,
    LoggerService,
  ],
  exports: [LoggerService],
})
export class AppModule {}
