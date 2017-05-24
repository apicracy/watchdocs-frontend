export const validationErrors = (validations, values) => {
  const errors = {};
  Object.keys(validations).forEach((field) => {
    const value = values[field];
    errors[field] = validations[field].map(validateField => validateField(value))
                                      .find(x => x);
  });
  return errors;
};
