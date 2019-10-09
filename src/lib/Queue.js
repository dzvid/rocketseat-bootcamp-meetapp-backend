import Bee from 'bee-queue';

import SubscriptionMail from '../app/jobs/SubscriptionMail';

import redisConfig from '../config/redis';

const jobs = [SubscriptionMail];

/**
 * Class responsible by the configurations related
 * to initialization and management of queues (jobs)
 */
class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  /**
   * Initialize background jobs
   */
  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  /**
   * Adds a new job to a queue.
   * @param {*} queue
   * @param {*} job
   */
  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  /**
   * Process the queues, calls the handle method of each job in the queue.
   */
  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  /**
   * Handles queues failures/errors.
   * @param {*} job
   * @param {*} err
   */
  handleFailure(job, err) {
    console.error(`Queue ${job.queue.name}: FAILED`, err);
  }
}

export default new Queue();
