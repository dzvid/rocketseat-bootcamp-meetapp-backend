import * as Yup from 'yup';

const SubscriptionSchema = {
  store: {
    body: Yup.object().shape({
      meetup_id: Yup.number()
        .typeError('meetup_id must be a number')
        .positive()
        .integer()
        .required(),
    }),
  },
};

export default SubscriptionSchema;
