import { isBefore, startOfHour, parseISO } from 'date-fns';

import Meetup from '../models/Meetup';
import File from '../models/File';

class MeetupController {
  /**
   * Allows a user to create a new meetup in the application. The user can create
   * thus organize more than one meetup at the same date/hour.
   */
  async store(req, res) {
    // TODO: data validation
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
}

export default new MeetupController();
