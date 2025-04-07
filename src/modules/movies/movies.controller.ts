import {
  Body,
  Controller,
  Post,
  UsePipes,
  Get,
  Query,
  ParseIntPipe,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './DTO/create-movie.DTO';
import { MovieDto } from './DTO/movie.DTO';
import { ZodValidationPipe } from '../../utils/pipes/Zod-Validation-Pipe';
import { createMovieSchema } from './validation-schemas/create-movie.schema';
import { FindManyResult } from '../../shared-types/FindManyResult';
import {
  limit,
  offset,
} from '../../shared-validation-schemas/pagination.schema';
import { UpdateMovieDto } from './DTO/update-movie.DTO';

@Controller('/movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createMovieSchema))
  async create(@Body() createMovieDto: CreateMovieDto): Promise<MovieDto> {
    return this.moviesService.create(createMovieDto);
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
    @Query('afterYear', new ParseIntPipe({ optional: true }))
    afterYear?: number,
    @Query('beforeYear', new ParseIntPipe({ optional: true }))
    beforeYear?: number,
  ): Promise<FindManyResult<MovieDto>> {
    const [movies, totalCount] = await Promise.all([
      this.moviesService.findMany(limit, offset, { afterYear, beforeYear }),
      this.moviesService.count({ afterYear, beforeYear }),
    ]);
    return {
      data: movies,
      totalCount,
    };
  }

  @Patch(':id')
  @UsePipes(new ZodValidationPipe(createMovieSchema))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    return this.moviesService.update(id, updateMovieDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @UsePipes(new ZodValidationPipe(createMovieSchema))
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.moviesService.delete(id);
    return;
  }
}
