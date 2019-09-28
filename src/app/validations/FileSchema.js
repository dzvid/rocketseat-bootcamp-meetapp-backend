import * as Yup from 'yup';

// TODO: When the file is invalid, it still gets persisted by the multer, needs to implement a clean up function.
// or transfer the file format and size verification to the multer (it can do it)

const SUPPORTED_IMAGE_FILE_FORMATS = [
  'image/jpg',
  'image/jpeg',
  'image/png',
  'image/gif',
];

// 2 MB = 2097152 Bytes
const MAX_IMAGE_FILE_SIZE = { value: 2097152, toMB: '2MB' };

const FileSchema = {
  store: Yup.object().shape({
    mimetype: Yup.string()
      .required('Image file is required')
      .test('valid-mimetype', 'Unsupported file type', value =>
        SUPPORTED_IMAGE_FILE_FORMATS.includes(value)
      ),

    size: Yup.number().test(
      'ok-size',
      `Max file size allowed is ${MAX_IMAGE_FILE_SIZE.toMB}`,
      value => value <= MAX_IMAGE_FILE_SIZE.value
    ),
  }),
};

export default FileSchema;
