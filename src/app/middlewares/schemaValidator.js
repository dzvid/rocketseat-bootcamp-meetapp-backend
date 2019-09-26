/**
 * Middleware to validate the request content according to a given schema and
 * request property.
 * @param {*} schema - The validation schema
 * @param {*} property - Request property (body, query or params) to be validated
 */
const schemaValidator = (schema, property) => {
  return async (req, res, next) => {
    // TODO: Since property is 'hardcoded', it is necessary to make sure that
    // property is one of the tree values: body, query or params
    try {
      await schema.validate(req[property], { abortEarly: false });

      // if validation is successful, continue to next middleware
      return next();
    } catch (exception) {
      // Validation failed
      const errors = exception.inner.map(({ path, message }) => ({
        field: path,
        message,
      }));

      return res.status(400).json({
        error: 'Input validation failed',
        errors,
      });
    }
  };
};

export default schemaValidator;
