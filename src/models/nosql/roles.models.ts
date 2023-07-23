import { Model, Schema, model } from 'mongoose';
import { IRol, IRolDocument } from '@interfaces/rol.interface';

const RolSchema = new Schema<IRolDocument, Model<IRol>>(
  {
    name: { type: String, unique: true, require: true },
    description: { type: String },
    permissions: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Permission' }]
    }
  },
  {
    timestamps: false,
    versionKey: false
  }
);

export const RolModel = model<IRolDocument, Model<IRol>>('Role', RolSchema);
