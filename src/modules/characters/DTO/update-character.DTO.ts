import { createZodDto } from 'nestjs-zod';
import { createCharacterSchema } from '../validation-schemas/create-character.schema';

export class UpdateCharacterDto extends createZodDto(createCharacterSchema) {}
