// import { Schema, Types, model } from 'mongoose';

// interface ICharacter {
//   name: string
// }

// const characterSchema = new Schema<ICharacter>({
//   name: { type: String, required: true }
// })

// const Character = model<ICharacter>('Character', characterSchema);

// export { Character, ICharacter }

import { Entity, PrimaryGeneratedColumn, Column} from "typeorm"
@Entity()
export class Character {
    @PrimaryGeneratedColumn()
    id: number

    @Column("text")
    name: string
}