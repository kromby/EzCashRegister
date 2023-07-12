import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { KeepTheChangeService } from './keepthechange/keepthechange.service';
import * as fs from 'fs';
import { LoggerService } from './logger/logger.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly keepthechangeService: KeepTheChangeService,
    private readonly loggerService: LoggerService,
  ) {}

  @Get()
  getHello(): string {
    const path = './src/assets/input.txt';
    const input = fs.readFileSync(path, 'utf-8');
    this.loggerService.log('Input: ' + input, 'AppController');
    const output = this.keepthechangeService.calculateChange(input, 3);

    this.loggerService.log('Output: \n' + output, 'AppController');

    return (
      '<html><body><h1>Input</h1>' +
      input +
      '<h1>Output</h1>' +
      output.replaceAll('\n', '<br/>') +
      '</body></html>'
    );
  }
}
