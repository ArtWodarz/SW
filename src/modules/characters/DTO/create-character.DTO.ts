import { createCharacterSchema } from '../validation-schemas/create-character.schema';
import { createZodDto } from 'nestjs-zod';

export class CreateCharacterDto extends createZodDto(createCharacterSchema) {}
