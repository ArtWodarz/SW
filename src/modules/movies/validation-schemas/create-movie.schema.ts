import { z } from 'zod';

export const createMoviechema = z
  .object({
    title: z.string(),
    year: z.number().optional(),
  })
  .required();
