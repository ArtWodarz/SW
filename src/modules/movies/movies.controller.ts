import { Body, Controller, Post } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './DTO/create-movie.DTO';
import { MovieDto } from './DTO/movie.DTO';

@Controller('/movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  async create(@Body() createMovieDto: CreateMovieDto): Promise<MovieDto> {
    return this.moviesService.create(createMovieDto);
  }
}
