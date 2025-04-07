import { z } from 'zod';
import { createCharacterSchema } from '../validation-schemas/create-character.schema';

export type CreateCharacterDto = z.infer<typeof createCharacterSchema>;
