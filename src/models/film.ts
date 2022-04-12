import { Schema, Types, model } from 'mongoose';

interface IFilm {
  title: string
  releaseDate: string
  characterList: Types.DocumentArray<Types.ObjectId>
}

const filmSchema = new Schema<IFilm>({
  title: { type: String, required: true },
  releaseDate: { type: String, required: true },
  characterList: [ { type: Schema.Types.ObjectId, ref: 'Character'} ]
})

const Film = model<IFilm>('Film', filmSchema);

export { Film, IFilm }