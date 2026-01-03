import multer from "multer";


const storage = multer.memoryStorage(); // Use memory storage to handle file data in memory


const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/pdf',
      'application/msword', // For .doc files
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // For .docx files
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  },
});

  


 export default upload


