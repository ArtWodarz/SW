export class ServiceError extends Error {
  code: string;
  constructor(message: string, code: string, options?: ErrorOptions) {
    super(message, options);
    this.code = code;
  }
}
