import * as Yup from 'yup';
// eslint(import/prefer-default-export)
const UserSchema = {
  store: Yup.object().shape({
    name: Yup.string()
      .typeError("'name' must be a string")
      .required("'name' field is required."),
    email: Yup.string()
      .typeError("'email' must be a string")
      .email("'email' field must be a valid email")
      .required("'email' is required"),
    password: Yup.string()
      .typeError("'password' must be a string")
      .min(6)
      .required("'password' field is required."),
    confirmPassword: Yup.string()
      .typeError("'password' must be a string")
      .min(6)
      .required("'confirm password' field is required.")
      .oneOf(
        [Yup.ref('password')],
        "'confirm password' field does not match password field."
      ),
  }),
  update: Yup.object().shape({
    name: Yup.string()
      .typeError("'name' must be a string")
      .min(1, "'name' can not be an empty string"),
    email: Yup.string()
      .typeError("'email' must be a string")
      .email("'email' field must be a valid email")
      .min(1, "'email' can not be an empty string"),
    oldPassword: Yup.string()
      .typeError("'old password' must be a string")
      .min(6),
    password: Yup.string()
      .typeError("'password' must be a string")
      .min(6)
      .when('oldPassword', (oldPassword, field) =>
        oldPassword
          ? field.required("New 'password' is required")
          : // Verify if password was informed
            field.test(
              'is-empty',
              "To update your 'password' is necessary to inform the 'old password'",
              value => !value
            )
      ),
    confirmPassword: Yup.string()
      .typeError("'confirm password' must be a string")
      .min(6)
      .when('password', (password, field) =>
        password
          ? field
              .required("'confirmation password' is required")
              .oneOf(
                [Yup.ref('password')],
                "'password' and 'confirmation password' does not match'"
              )
          : // else, Verify if confirmation password was informed
            field.test(
              'is-empty',
              "'password' field was not informed",
              value => !value
            )
      ),
  }),
};

export default UserSchema;
