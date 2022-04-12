import { Schema, Types, model } from 'mongoose';

interface ICharacter {
  name: string
}

const characterSchema = new Schema<ICharacter>({
  name: { type: String, required: true }
})

const Character = model<ICharacter>('Character', characterSchema);

export { Character, ICharacter }