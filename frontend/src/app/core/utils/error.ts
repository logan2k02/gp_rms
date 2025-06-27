export class ErrorUtils {
  static getMessage = (err: any) => {
    if (err?.error?.message) {
      return err.error.message;
    }
    if (err?.error?.detail) {
      return err.error.detail;
    }
    if (err?.message) {
      return err.message;
    }
    return 'An unexpected error occurred';
  };
}
