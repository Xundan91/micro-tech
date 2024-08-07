import { Router } from 'express';
import multer from 'multer';
import Image from '../models/Image.js';

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', upload.single('image'), async (req, res) => {
  const { name, desc } = req.body;
  const img = {
    data: req.file.buffer,
    contentType: req.file.mimetype,
  };

  const newImage = new Image({ name, desc, img });

  try {
    await newImage.save();
    res.status(201).json(newImage);
  } catch (error) {
    res.status(500).json({ message: 'Failed to upload image', error });
  }
});

router.get('/', async (req, res) => {
  try {
    const images = await Image.find();
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch images', error });
  }
});

export default router;
