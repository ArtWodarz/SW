import { ServiceError } from './Service-Error';

export class DuplicateResourceError extends ServiceError {
  constructor(message: string, options?: ErrorOptions) {
    super(message, 'DUPLICATE_RESOURCE', options);
  }
}
