import { z } from 'zod';
import { createMoviechema } from '../validation-schemas/create-movie.schema';

export type CreateMovieDto = z.infer<typeof createMoviechema>;
