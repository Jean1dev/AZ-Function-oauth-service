import * as Mongoose from 'mongoose';

export interface IUsuario extends Mongoose.Document {
  login: string
  password: string
}

const Usuario = new Mongoose.Schema({
  login: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  collection: 'usuarios'
})

export default Mongoose.model<IUsuario>('Usuario', Usuario)
