import { useState, useCallback } from 'react';

type ValidationRules<T> = {
  [K in keyof T]?: (value: T[K]) => string | null;
};

type Errors<T> = Partial<Record<keyof T, string>>;
type Touched<T> = Partial<Record<keyof T, boolean>>;

/**
 * Lightweight form hook — manages values, validation, touched tracking and reset.
 */
export function useForm<T extends Record<string, any>>(
  initialValues: T,
  rules?: ValidationRules<T>,
) {
  const [values, setValues] = useState<T>(initialValues);
  const [touched, setTouched] = useState<Touched<T>>({});

  const setValue = useCallback(
    <K extends keyof T>(field: K, value: T[K]) => {
      setValues((prev) => ({ ...prev, [field]: value }));
      setTouched((prev) => ({ ...prev, [field]: true }));
    },
    [],
  );

  const reset = useCallback(() => {
    setValues(initialValues);
    setTouched({});
  }, [initialValues]);

  // Derive errors from rules (only for touched fields)
  const errors: Errors<T> = {};
  if (rules) {
    for (const key of Object.keys(rules) as (keyof T)[]) {
      const rule = rules[key];
      if (rule) {
        const msg = rule(values[key]);
        if (msg) errors[key] = msg;
      }
    }
  }

  /** Returns errors only for touched fields (for inline display). */
  const visibleErrors: Errors<T> = {};
  for (const key of Object.keys(errors) as (keyof T)[]) {
    if (touched[key]) visibleErrors[key] = errors[key];
  }

  /** Touch all fields — useful before a submit attempt. */
  const touchAll = useCallback(() => {
    const all: Touched<T> = {};
    for (const key of Object.keys(initialValues) as (keyof T)[]) {
      all[key] = true;
    }
    setTouched(all);
  }, [initialValues]);

  const isValid = Object.keys(errors).length === 0;

  return {
    values,
    setValue,
    errors,
    visibleErrors,
    touched,
    touchAll,
    isValid,
    reset,
  } as const;
}
