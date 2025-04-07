import {
  PipeTransform,
  BadRequestException,
  InternalServerErrorException,
  Logger,
  ArgumentMetadata,
} from '@nestjs/common';
import { ZodSchema, ZodError } from 'zod';

export class ZodValidationPipe<T> implements PipeTransform {
  constructor(private schema: ZodSchema<T>) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      if (metadata.type === 'param') return value;
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (e) {
      if (e instanceof ZodError) {
        throw new BadRequestException(
          e.errors.map((error) => ({
            ...error,
            path:
              metadata.type === 'query'
                ? [metadata.type, metadata.data]
                : [metadata.type, ...error.path],
          })),
        );
      }
      Logger.error(e);
      throw new InternalServerErrorException();
    }
  }
}
