import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Logger,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { CharactersService } from './characters.service';
import { ZodValidationPipe } from '../../utils/pipes/Zod-Validation-Pipe';
import { createCharacterSchema } from './validation-schemas/create-character.schema';
import { CreateCharacterDto } from './DTO/create-character.DTO';
import { CharacterDto } from './DTO/character.DTO';
import { DuplicateResourceError } from '../../utils/errors/Duplicate-Resource-Error';
import { SubresourceDoesNotExistsError } from '../../utils/errors/Subresource-Does-not-exists';
import {
  limit,
  offset,
} from '../../shared-validation-schemas/pagination.schema';
import { FindManyResult } from '../../shared-types/FindManyResult';
import { UpdateCharacterDto } from './DTO/update-character.DTO';

@Controller('/characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}
  @Post()
  @UsePipes(new ZodValidationPipe(createCharacterSchema))
  async create(
    @Body() createCharacterDto: CreateCharacterDto,
  ): Promise<CharacterDto> {
    try {
      const character = await this.charactersService.create(createCharacterDto);
      return character;
    } catch (e) {
      if (e instanceof DuplicateResourceError) {
        throw new HttpException(e.message, HttpStatus.CONFLICT);
      } else if (e instanceof SubresourceDoesNotExistsError) {
        throw new HttpException(e.message, HttpStatus.CONFLICT);
      }
      Logger.error(e);
      throw e;
    }
  }

  @Get()
  async findMany(
    @Query(
      'limit',
      new ParseIntPipe({ optional: true }),
      new ZodValidationPipe(limit),
    )
    limit: number,
    @Query(
      'offset',
      new ParseIntPipe({ optional: true }),
      new ZodValidationPipe(offset),
    )
    offset: number,
  ): Promise<FindManyResult<CharacterDto>> {
    const [characters, totalCount] = await Promise.all([
      this.charactersService.findMany(limit, offset),
      this.charactersService.count(),
    ]);
    return {
      data: characters,
      totalCount,
    };
  }

  @Patch(':id')
  @UsePipes(new ZodValidationPipe(createCharacterSchema))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCharacterDto: UpdateCharacterDto,
  ) {
    try {
      const character = await this.charactersService.update(
        id,
        updateCharacterDto,
      );
      return character;
    } catch (e) {
      if (e instanceof NotFoundException) throw new NotFoundException();
      throw e;
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.charactersService.delete(id);
    } catch (e) {
      if (e instanceof NotFoundException) throw new NotFoundException();
      throw e;
    }
  }
}
