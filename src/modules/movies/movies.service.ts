import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../utils/prisma.service';
import { CreateMovieDto } from './DTO/create-movie.DTO';
import { MovieDto } from './DTO/movie.DTO';
import { UpdateMovieDto } from './DTO/update-movie.DTO';
import { FindMoviesFilters } from './DTO/find-movies-filters.DTO.';
import { ResourceNotFoundError } from 'src/utils/errors/Resource-Not-Found-Error';

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
      id: movie.narrativeUnitId,
      title: movie.title,
      year: movie.year,
    };
  }

  async findMany(
    limit: number,
    offset: number,
    filters: FindMoviesFilters,
  ): Promise<MovieDto[]> {
    const movies = await this.prisma.movie.findMany({
      take: limit,
      skip: offset,
      where: {
        AND: [
          {
            year: {
              gt: filters.afterYear,
            },
          },
          {
            year: {
              lt: filters.beforeYear,
            },
          },
        ],
      },
      orderBy: [
        {
          year: 'asc',
        },
        {
          title: 'asc',
        },
      ],
    });
    return movies.map((movie) => ({
      id: movie.narrativeUnitId,
      title: movie.title,
      year: movie.year,
    }));
  }

  async count(filters: FindMoviesFilters): Promise<number> {
    return this.prisma.movie.count({
      where: {
        AND: [
          {
            year: {
              gt: filters.afterYear,
            },
          },
          {
            year: {
              lt: filters.beforeYear,
            },
          },
        ],
      },
    });
  }

  async update(id: number, movieDto: UpdateMovieDto): Promise<MovieDto> {
    const movie = await this.prisma.movie.update({
      where: {
        narrativeUnitId: id,
      },
      data: movieDto,
    });
    return {
      id: movie.narrativeUnitId,
      title: movie.title,
      year: movie.year,
    };
  }

  async delete(id: number): Promise<void> {
    const movie = await this.prisma.movie.findFirst({
      where: { narrativeUnitId: id },
    });
    if (!movie) throw new ResourceNotFoundError('NOT FOUND');
    await this.prisma.movie.delete({
      where: {
        narrativeUnitId: id,
      },
    });
    return;
  }
}
