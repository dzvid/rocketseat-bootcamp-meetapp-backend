import File from '../models/File';

class FileController {
  /**
   * Saves informations about file uploaded. Fetch file originalname(name) and
   * filename(path) from the req.file field included in the request by the upload middleware.
   * Returns all the informations about the file uploaded.
   */
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    const file = await File.create({
      name,
      path,
    });

    return res.json({ file });
  }
}

export default new FileController();
