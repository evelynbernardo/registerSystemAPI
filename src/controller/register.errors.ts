export class UserNotFound extends Error {
    constructor () {
      const formatted = {
        errors: [{ error: 'wallet provider not found', path: 'id' }],
        message: 'srn:error:not_found',
      }
      super(JSON.stringify(formatted, null, 2))
    }
  }