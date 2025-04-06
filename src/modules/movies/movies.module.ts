import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { PrismaService } from '../../utils/prisma.service';

@Module({
  imports: [],
  controllers: [MoviesController],
  providers: [PrismaService, MoviesService],
})
export class MoviesModule {}
