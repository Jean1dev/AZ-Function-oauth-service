import * as mongoose from 'mongoose';

const Usuario = new mongoose.Schema({
  login: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

export default mongoose.model('Usuario', Usuario)
