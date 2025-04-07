import { z } from 'zod';
import { createMovieSchema } from '../validation-schemas/create-movie.schema';

export type CreateMovieDto = z.infer<typeof createMovieSchema>;
