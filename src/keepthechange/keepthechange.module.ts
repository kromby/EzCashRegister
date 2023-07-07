import { Module } from '@nestjs/common';
import { KeepTheChangeService } from './keepthechange.service';

@Module({
  providers: [KeepTheChangeService],
  exports: [KeepTheChangeService]
})
export class KeepTheChangeModule {}
