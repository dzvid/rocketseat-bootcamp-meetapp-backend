import { isBefore, startOfHour, parseISO } from 'date-fns';

import Meetup from '../models/Meetup';
import File from '../models/File';

class MeetupController {
  /**
   * Allows a user to create a new meetup in the application. The user can create
   * thus organize more than one meetup at the same date/hour.
   */
  async store(req, res) {
    // Fetch datato create a user
    const { userId } = req;
    const { title, description, location, date, banner_id } = req.body;

    // Check if banner_id is valid
    const bannerExists = await File.findOne({ where: { id: banner_id } });

    if (!bannerExists) {
      return res.status(400).json({ error: 'Invalid banner informed' });
    }

    // Checks if meetup date is not in the past
    // Since meetups are set by hour, set zero values to minutes and seconds
    const meetupDate = startOfHour(parseISO(date));

    if (isBefore(meetupDate, new Date())) {
      return res.status(400).json({
        error: 'Invalid date informed: Past dates are not permitted',
      });
    }

    const newMeetup = await Meetup.create({
      user_id: userId,
      title,
      description,
      location,
      date: meetupDate,
      banner_id,
    });

    return res.json(newMeetup);
  }

  /**
   *  Allows a user to edit a meetup details.
   */
  async update(req, res) {
    // Fetch meetup to edit and verify it it exists
    const meetup = await Meetup.findByPk(req.params.id);

    if (!meetup) {
      return res.status(400).json({ error: 'Invalid meetup' });
    }

    // Check if current user can edit the meetup
    if (meetup.user_id !== req.userId) {
      return res.status(400).json({
        error: 'User not autorized, only meetup organizer can edit details',
      });
    }

    // Check if meetup has passed
    if (isBefore(meetup.date, new Date())) {
      return res.status(400).json({ error: 'Past meetups can not be edited' });
    }

    // Check if new meetup date has passed
    const newMeetupDate = startOfHour(parseISO(req.body.date));

    if (isBefore(newMeetupDate, new Date())) {
      return res
        .status(400)
        .json({ error: 'Invalid date informed: Past dates are not permitted' });
    }

    // Check if banner_id exists
    const bannerExists = await File.findOne({
      where: { id: req.body.banner_id },
    });

    if (!bannerExists) {
      return res.status(400).json({ error: 'Invalid banner informed' });
    }

    await meetup.update(req.body);

    return res.json(meetup);
  }
}

export default new MeetupController();
