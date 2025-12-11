// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const resetFieldError = (state: any, field: string) => {
  if (state?.errors?.formErrors[field]) {
    state.errors.formErrors[field] = undefined;
  }
};
