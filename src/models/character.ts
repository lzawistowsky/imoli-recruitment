import { Entity, PrimaryGeneratedColumn, Column} from "typeorm"
@Entity()
export class Character {
    @PrimaryGeneratedColumn()
    id: number

    @Column("text")
    name: string
}