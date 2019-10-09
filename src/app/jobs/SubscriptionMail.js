import Mail from '../../lib/Mail';

class SubscriptionMail {
  /**
   * Returns queue identifier
   */
  get key() {
    return 'SubscriptionMail';
  }

  /**
   * Task responsible to send an email to the meetup organizer, executed when
   * the job is called.
   */
  async handle({ data }) {
    const { user, meetup } = data;

    await Mail.sendMail({
      to: `${meetup.organizer.name} <${meetup.organizer.email}>`,
      subject: `New subscription to: ${meetup.title}`,
      template: 'subscription',
      context: {
        organizer: meetup.organizer.name,
        meetup: meetup.title,
        user: user.name,
      },
    });
  }
}

export default new SubscriptionMail();
