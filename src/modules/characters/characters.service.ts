import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../utils/prisma.service';

@Injectable()
export class CharactersService {
  constructor(private prisma: PrismaService) {}
}
