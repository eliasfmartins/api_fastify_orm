export class ResourceNotFOundError extends Error {
    constructor() {
      super('Resource not found.')
    }
  }