import { isBefore } from 'date-fns';
import Subscription from '../models/Subscription';
import User from '../models/User';
import Meetup from '../models/Meetup';

class SubscriptionController {
  /**
   * Allows a user to subscribe to a meetup.
   */
  async store(req, res) {
    const user = await User.findByPk(req.userId);
    const meetup = await Meetup.findByPk(req.body.meetup_id);

    if (!meetup) {
      return res.status(404).json({
        error: 'Meetup was not found',
      });
    }

    if (!user) {
      return res.status(404).json({
        error: 'User was not found',
      });
    }

    // Checks if user is meetup organizer
    if (meetup.user_id === user.id) {
      return res.status(400).json({
        error: 'Organizers can not subscribe to its own meetup',
      });
    }

    // Checks if meetup has passed
    if (isBefore(meetup.date, new Date())) {
      return res.status(400).json({
        error: 'Can not subscribe to past meetups',
      });
    }

    // Check if user is already subscribed to meetup
    const subscriptionExists = await Subscription.findOne({
      where: {
        user_id: user.id,
        meetup_id: req.body.meetup_id,
      },
    });

    if (subscriptionExists) {
      return res
        .status(400)
        .json({ error: 'Subscription to meetup already exists' });
    }

    // Check if user is not subscrided to another meetup happening at the same time
    const concurrentMeetupExists = await Subscription.findOne({
      where: {
        user_id: user.id,
      },
      include: [
        {
          model: Meetup,
          where: {
            date: meetup.date,
          },
        },
      ],
    });

    if (concurrentMeetupExists) {
      return res.status(400).json({
        error: 'Can not subscribe to meetups happening at the same time',
      });
    }

    // TODO: Send email to meetup organizer

    const subscription = await Subscription.create({
      user_id: req.userId,
      meetup_id: req.body.meetup_id,
    });

    return res.json(subscription);
  }
}

export default new SubscriptionController();