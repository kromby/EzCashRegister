import { KeepTheChangeModule } from './keepthechange/keepthechange.module';
import { KeepTheChangeService } from './keepthechange/keepthechange.service';
// import { KeepthechangeModule } from './keepthechange/keepthechange.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [KeepTheChangeModule],
  controllers: [AppController],
  providers: [AppService, KeepTheChangeService],
})
export class AppModule {}
