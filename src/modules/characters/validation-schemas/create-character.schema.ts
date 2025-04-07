import { z } from 'zod';

export const createCharacterSchema = z
  .object({
    name: z.string(),
    planet: z.string().optional(),
    movieIds: z.number().array(),
  })
  .required();
