import { Module } from '@nestjs/common';
import { CharactersController } from './characters.controller';
import { CharactersService } from './characters.service';
import { PrismaService } from '../../utils/prisma.service';

@Module({
  imports: [],
  controllers: [CharactersController],
  providers: [PrismaService, CharactersService],
})
export class CharactersModule {}
