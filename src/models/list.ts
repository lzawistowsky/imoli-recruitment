// import { Schema, Types, model } from 'mongoose';

// interface IList {
//   listName: string
//   films: Types.DocumentArray<Types.ObjectId>
// }

// const listSchema = new Schema<IList>({
//   listName: { type: String, required: true },
//   films: [ { type: Schema.Types.ObjectId, ref: 'Film'} ]
// })

// const List = model<IList>('List', listSchema);

// export { List, IList }

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