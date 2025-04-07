import { ServiceError } from './Service-Error';

export class ResourceNotFoundError extends ServiceError {
  constructor(message: string, options?: ErrorOptions) {
    super(message, 'RESOURCE_NOT_FOUND', options);
  }
}
