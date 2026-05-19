export type Result<T> =
  | {
      success: true
      data: T
      message?: string
    }
  | {
      success: false
      error: string
      message?: string
    }

export const Result = {
  ok<T>(data: T, message?: string): Result<T> {
    return {
      success: true,
      data,
      message,
    }
  },

  fail(error: string, message?: string): Result<never> {
    return {
      success: false,
      error,
      message,
    }
  },
}
