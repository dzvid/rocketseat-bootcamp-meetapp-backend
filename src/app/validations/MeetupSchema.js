import * as Yup from 'yup';

const MeetupSchema = {
  store: Yup.object().shape({
    title: Yup.string()
      .typeError('title must be a string')
      .max(255)
      .required(),
    description: Yup.string()
      .typeError('description must be a string')
      .max(255)
      .required(),
    location: Yup.string()
      .typeError('location must be a string')
      .max(255)
      .required(),
    date: Yup.date()
      .typeError('date must be a date type')
      .required(),
    banner_id: Yup.number()
      .typeError('banner_id must be a number')
      .positive()
      .integer()
      .required(),
  }),
};

export default MeetupSchema;
