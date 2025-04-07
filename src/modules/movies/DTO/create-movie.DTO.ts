import { createMovieSchema } from '../validation-schemas/create-movie.schema';
import { createZodDto } from 'nestjs-zod';

export class CreateMovieDto extends createZodDto(createMovieSchema) {}
