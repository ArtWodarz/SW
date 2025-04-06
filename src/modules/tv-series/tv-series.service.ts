import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../utils/prisma.service';

@Injectable()
export class TvSeriesService {
  constructor(private prisma: PrismaService) {}
}
