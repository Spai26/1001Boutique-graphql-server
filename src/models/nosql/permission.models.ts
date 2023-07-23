import { Schema, model } from 'mongoose';
import {
  IPermisionDocument,
  IPermission
} from '@interfaces/permission.interface';
import { Model } from 'mongoose';

const PermissionSchema = new Schema<IPermisionDocument, Model<IPermission>>(
  {
    name: { type: String, unique: true, require: true },
    description: { type: String }
  },
  {
    timestamps: false,
    versionKey: false
  }
);

export const PermisionModel = model<IPermisionDocument, Model<IPermission>>(
  'Permission',
  PermissionSchema
);
