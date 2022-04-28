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