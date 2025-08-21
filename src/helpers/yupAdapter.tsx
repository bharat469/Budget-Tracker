// hooks/useValidation.ts
import { FormikHelpers, FormikValues, useFormik } from 'formik';
import * as Yup from 'yup';

interface UseValidationProps<T> {
  initialValues: T;
  validationSchema: Yup.ObjectSchema<any>;
  onSubmit: (values: T, formikHelpers: FormikHelpers<T>) => void;
}

export function useValidation<T extends FormikValues>({
  initialValues,
  validationSchema,
  onSubmit,
}: UseValidationProps<T>) {
  return useFormik<T>({
    initialValues,
    validationSchema,
    onSubmit,
    validateOnChange: true,
    validateOnBlur: true,
  });
}
