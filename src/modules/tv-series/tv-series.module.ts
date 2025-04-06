import { Module } from '@nestjs/common';
import { TvSeriesController } from './tv-series.controller';
import { TvSeriesService } from './tv-series.service';
import { PrismaService } from '../../utils/prisma.service';

@Module({
  imports: [],
  controllers: [TvSeriesController],
  providers: [PrismaService, TvSeriesService],
})
export class TvSeriesModule {}
