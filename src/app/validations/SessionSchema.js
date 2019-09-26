import * as Yup from 'yup';

const SessionSchema = {
  store: Yup.object().shape({
    email: Yup.string()
      .typeError("'email' must be a string")
      .email("'email' field must be a valid email")
      .required("'email' is required"),
    password: Yup.string()
      .typeError("'password' must be a string")
      .min(6)
      .required("'password' field is required."),
  }),
};

export default SessionSchema;
