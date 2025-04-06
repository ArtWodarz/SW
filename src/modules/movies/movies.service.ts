import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../utils/prisma.service';
import { CreateMovieDto } from './DTO/create-movie.DTO';
import { MovieDto } from './DTO/movie.DTO';

@Injectable()
export class MoviesService {
  constructor(private prisma: PrismaService) {}

  async create(createMovieDto: CreateMovieDto): Promise<MovieDto> {
    const movie = await this.prisma.$transaction(async (tx) => {
      const narrativeUnit = await tx.narrativeUnit.create({});
      const movie = tx.movie.create({
        data: {
          title: createMovieDto.title,
          year: createMovieDto.year,
          narrativeUnitId: narrativeUnit.id,
        },
      });
      return movie;
    });
    return {
      id: movie.id,
      title: movie.title,
      year: movie.year,
    };
  }
}
