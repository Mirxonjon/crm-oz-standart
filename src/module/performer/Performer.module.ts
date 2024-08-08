import { Module } from '@nestjs/common';
import { SendedPerformerController } from './Performer.controller';
import { SendedPerformerService } from './Performer.service';

@Module({
  controllers: [SendedPerformerController],
  providers: [SendedPerformerService],
})
export class PerformerModule {}
