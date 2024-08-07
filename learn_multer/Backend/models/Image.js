import { Schema, model } from 'mongoose';

const imageSchema = new Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  img: {
    data: Buffer,
    contentType: String,
  },
});

export default model('Image', imageSchema);