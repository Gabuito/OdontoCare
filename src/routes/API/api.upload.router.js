import { Router } from 'express';
import multer from 'multer';
import uploadController from '../../controllers/API/upload.controller.js';

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedImageTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    const allowedDocTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/png'
    ];

    if (req.path.includes('/image')) {
      if (allowedImageTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error('Apenas imagens PNG, JPEG ou JPG são permitidas'));
      }
    } else if (req.path.includes('/doc')) {
      if (allowedDocTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error('Apenas documentos PDF, DOC, DOCX ou PNG são permitidos'));
      }
    }
  }
});

// Rota para upload de imagem de cliente
router.post('/v2/client/image/:id', 
  upload.single('file'),
  uploadController.uploadClientImage
);

// Rota para upload de imagem de funcionário
router.post('/v2/employee/image/:id',
  upload.single('file'),
  uploadController.uploadEmployeeImage
);

// Rota para upload de documentos
router.post('/v2/doc/:type/:id',
  upload.single('file'),
  uploadController.uploadDocument
);

export default router;

