import { z } from 'zod';

export const createMovieSchema = z
  .object({
    title: z.string(),
    year: z.number().optional(),
  })
  .required();
