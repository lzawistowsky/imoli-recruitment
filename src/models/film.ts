// import { Schema, Types, model } from 'mongoose';

// interface IFilm {
//   title: string
//   releaseDate: string
//   characterList: Types.DocumentArray<Types.ObjectId>
// }

// const filmSchema = new Schema<IFilm>({
//   title: { type: String, required: true },
//   releaseDate: { type: String, required: true },
//   characterList: [ { type: Schema.Types.ObjectId, ref: 'Character'} ]
// })

// const Film = model<IFilm>('Film', filmSchema);

// export { Film, IFilm }

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm"

import { Character } from "./character"
@Entity()
export class Film {
    @PrimaryGeneratedColumn()
    id: number

    @Column("text")
    title: string

    @Column("text")
    releaseDate: string

    @ManyToMany(() => Character)
    @JoinTable()
    characters: Character[]
}