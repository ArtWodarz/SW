import { ServiceError } from './Service-Error';

export class SubresourceDoesNotExistsError extends ServiceError {
  constructor(message: string, options?: ErrorOptions) {
    super(message, 'SUBRESOURCE_DOES_NOT_EXISTS', options);
  }
}
