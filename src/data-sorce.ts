import { DataSource } from "typeorm"
import { Character } from "./models/character"
import { List } from "./models/list"
import { Film } from "./models/film"

import 'dotenv/config'

const AppDataSource = new DataSource({
    url: process.env.DB_CONNECT,
    type: "postgres",
    synchronize: true,
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
    entities: [Character, List, Film]
})

export { AppDataSource }