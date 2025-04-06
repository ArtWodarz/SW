import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../utils/prisma.service';
import { CreateMovieDto } from './DTO/create-movie.DTO';
import { MovieDto } from './DTO/movie.DTO';
import { UpdateMovieDto } from './DTO/update-movie.DTO';
import { FindMoviesFilters } from './DTO/findMoviesFiltersDTO.';

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
      id: movie.id,
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
    return this.prisma.movie.update({
      where: {
        id,
      },
      data: movieDto,
    });
  }

  async delete(id: number): Promise<MovieDto> {
    return this.prisma.movie.delete({
      where: {
        id,
      },
    });
  }
}
