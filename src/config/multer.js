import multer from 'multer';
import crypto from 'crypto';

// extname is used to get file extension
import { extname, resolve } from 'path';

/**
 * Defines how to format the filename of the received files
 * and adds an unique random name for each file uploaded.
 * Returns new file name: randomhexname.fileextension. Otherswise, return error.
 */
export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);

        // If theres no error, returns new file name: randomhexname.fileextension
        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
