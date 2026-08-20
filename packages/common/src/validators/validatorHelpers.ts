import { ZodType } from "zod";

export type TValidationError<T> = Partial<Record<keyof T, string>>;

export type TValidationResult<T> = {
  isValid: boolean;
  errors: TValidationError<T>;
  data?: T;
  message?: string;
};

function extractZodErrors(issues: any[]): any {
  const errors: any = {};
  for (const issue of issues) {
    let curr: any = errors;
    for (let i = 0; i < issue.path.length; i++) {
      const key = issue.path[i];
      const isLast = i === issue.path.length - 1;

      if (isLast) {
        if (Array.isArray(curr) && typeof key === "number") {
          curr[key] = issue.message;
        } else {
          curr[key as string] = issue.message;
        }
      } else {
        if (
          curr[key as any] === undefined ||
          typeof curr[key as any] === "string"
        ) {
          curr[key as any] = typeof issue.path[i + 1] === "number" ? [] : {};
        }
        curr = curr[key as any];
      }
    }
  }
  return errors;
}

function getFirstErrorMessage(errors: any): string | undefined {
  if (typeof errors === "string") {
    return errors;
  }

  if (Array.isArray(errors)) {
    for (const item of errors) {
      const message = getFirstErrorMessage(item);
      if (message) return message;
    }
  } else if (typeof errors === "object" && errors !== null) {
    for (const key in errors) {
      const message = getFirstErrorMessage(errors[key]);
      if (message) return message;
    }
  }

  return undefined;
}

export function zodSchemaWrapper<T extends object>(
  schema: ZodType<T, any, any>,
) {
  return (data: unknown): TValidationResult<T> => {
    const result = schema.safeParse(data);
    if (result.success) {
      return { isValid: true, errors: {}, data: result.data };
    }
    const errors = extractZodErrors(result.error.issues);
    const message = getFirstErrorMessage(errors);
    return { isValid: false, errors, message };
  };
}
