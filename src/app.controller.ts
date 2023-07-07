import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { KeepTheChangeService } from './keepthechange/keepthechange.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly keepthechangeService: KeepTheChangeService,
  ) {}

  @Get()
  getHello(): string {
    return this.keepthechangeService.getCurrency(2.12, 3.0, 3, [0.25, 0.1, 0.01]);
  }
}
