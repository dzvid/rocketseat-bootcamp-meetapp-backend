import { isBefore } from 'date-fns';
import { Op } from 'sequelize';
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
          as: 'meetup',
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

    const subscription = await Subscription.create({
      user_id: req.userId,
      meetup_id: req.body.meetup_id,
    });

    // TODO: Send email to meetup organizer

    return res.json(subscription);
  }

  /**
   * Allows a user to list all future meetups that he is subscribed.
   */
  async index(req, res) {
    const subscriptions = await Subscription.findAll({
      where: {
        user_id: req.userId,
      },
      include: [
        {
          model: Meetup,
          as: 'meetup',
          required: true,
          where: {
            date: {
              [Op.gt]: new Date(),
            },
          },
          include: [
            {
              model: User,
              as: 'organizer',
              attributes: ['name', 'email'],
            },
          ],
          order: [['date', 'ASC']],
        },
      ],
    });

    return res.json(subscriptions);
  }
}

export default new SubscriptionController();
