import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
} from "typeorm"

import { Film } from "./film"
@Entity()
export class List {
    @PrimaryGeneratedColumn()
    id: number

    @Column("text")
    listName: string

    @ManyToMany(() => Film)
    @JoinTable()
    films: Film[]
}