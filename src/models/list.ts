import { Schema, Types, model } from 'mongoose';

interface IList {
  listName: string
  films: Types.DocumentArray<Types.ObjectId>
}

const listSchema = new Schema<IList>({
  listName: { type: String, required: true },
  films: [ { type: Schema.Types.ObjectId, ref: 'Film'} ]
})

const List = model<IList>('List', listSchema);

export { List, IList }