import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../utils/prisma.service';
import { CharacterDto } from './DTO/character.DTO';
import { CreateCharacterDto } from './DTO/create-character.DTO';
import { DuplicateResourceError } from '../../utils/errors/Duplicate-Resource-Error';
import { SubresourceDoesNotExistsError } from '../../utils/errors/Subresource-Does-not-exists';
import { UpdateCharacterDto } from './DTO/update-character.DTO';
import { ResourceNotFoundError } from '../../utils/errors/Resource-Not-Found-Error';

@Injectable()
export class CharactersService {
  constructor(private prisma: PrismaService) {}

  async create(createCharacterDto: CreateCharacterDto): Promise<CharacterDto> {
    const existingCharacter = await this.prisma.character.findFirst({
      where: { name: createCharacterDto.name },
    });
    if (existingCharacter)
      throw new DuplicateResourceError(
        `Character with name ${existingCharacter.name} already exists`,
      );
    const existingNarrativeUnits = await this.prisma.narrativeUnit.findMany({
      where: {
        id: {
          in: createCharacterDto.movieIds,
        },
      },
      select: {
        id: true,
      },
    });

    if (existingNarrativeUnits.length < createCharacterDto.movieIds.length) {
      const missingUnits = createCharacterDto.movieIds.filter(
        (id) =>
          !existingNarrativeUnits
            .map((narrativeUnit) => narrativeUnit.id)
            .includes(id),
      );
      throw new SubresourceDoesNotExistsError(
        `Movies of ids: [${missingUnits.join(', ')}] does not exists!`,
      );
    }

    const character = await this.prisma.$transaction(async (tx) => {
      const character = await tx.character.create({
        data: {
          name: createCharacterDto.name,
          planet: createCharacterDto.planet,
          characterAppearances: {
            create: createCharacterDto.movieIds.map((movieId) => ({
              narrativeUnit: {
                connect: {
                  id: movieId,
                },
              },
            })),
          },
        },
        include: {
          characterAppearances: {
            include: {
              narrativeUnit: {
                include: {
                  movie: true,
                },
              },
            },
          },
        },
      });
      return character;
    });
    return {
      id: character.id,
      name: character.name,
      planet: character.planet,

      moviesApperances: character.characterAppearances
        .map((appearance) => appearance.narrativeUnit.movie?.title)
        .filter((appearance) => appearance !== undefined),
    };
  }

  async findMany(limit: number, offset: number): Promise<CharacterDto[]> {
    const characters = await this.prisma.character.findMany({
      take: limit,
      skip: offset,
      include: {
        characterAppearances: {
          include: {
            narrativeUnit: {
              include: {
                movie: true,
              },
            },
          },
        },
      },
    });
    return characters.map((character) => ({
      id: character.id,
      name: character.name,
      planet: character.planet,

      moviesApperances: character.characterAppearances
        .map((appearance) => appearance.narrativeUnit.movie?.title)
        .filter((appearance) => appearance !== undefined),
    }));
  }

  async count(): Promise<number> {
    return this.prisma.movie.count();
  }

  async update(
    id: number,
    updateCharacterDto: UpdateCharacterDto,
  ): Promise<CharacterDto> {
    const existingCharacter = await this.prisma.character.findFirst({
      where: { id },
    });

    if (!existingCharacter) throw new ResourceNotFoundError('NOT FOUND');

    const character = await this.prisma.$transaction(async (tx) => {
      await tx.characterAppearance.deleteMany({
        where: {
          narrativeUnitId: {
            notIn: updateCharacterDto.movieIds,
          },
        },
      });
      const character = await tx.character.create({
        data: {
          name: updateCharacterDto.name,
          planet: updateCharacterDto.planet,
          characterAppearances: {
            create: updateCharacterDto.movieIds.map((movieId) => ({
              narrativeUnit: {
                connect: {
                  id: movieId,
                },
              },
            })),
          },
        },
        include: {
          characterAppearances: {
            include: {
              narrativeUnit: {
                include: {
                  movie: true,
                },
              },
            },
          },
        },
      });
      return character;
    });
    return {
      id: character.id,
      name: character.name,
      planet: character.planet,

      moviesApperances: character.characterAppearances
        .map((appearance) => appearance.narrativeUnit.movie?.title)
        .filter((appearance) => appearance !== undefined),
    };
  }

  async delete(id: number): Promise<void> {
    const character = await this.prisma.character.findFirst({ where: { id } });
    if (!character) throw new ResourceNotFoundError('NOT FOUND');
    await this.prisma.character.delete({
      where: {
        id,
      },
    });
    return;
  }
}
