import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { KeepTheChangeService } from './keepthechange/keepthechange.service';
import Decimal from 'decimal.js';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly keepthechangeService: KeepTheChangeService,
  ) {}

  @Get()
  getHello(): string {
    return this.keepthechangeService.getCurrency(
      new Decimal('3.33'),
      new Decimal('5'),
      3,
    );
  }
}
