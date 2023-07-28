import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import { IUser, IUserDocument, IUserModel } from '@interfaces/index';

const UserSchema = new Schema<IUser>(
  {
    firstname: { type: String, require: true },
    lastname: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    username: { type: String, require: true, unique: true },
    phone: { type: String, default: null },
    website: { type: String, default: null },
    password: { type: String, require: true },
    rol: { type: Schema.Types.ObjectId, ref: 'Role' },
    blogs: [{ type: Schema.Types.ObjectId, ref: 'Blog' }],
    brands: [{ brandName: String }],
    stores: [{ storeName: String }]
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
    versionKey: false
  }
);

UserSchema.pre<IUserDocument>('save', async function onSave(next) {
  if (!this.isNew) {
    return next();
  }
  try {
    const hashPassword = await this.encryptPassword(this.password);

    this.password = hashPassword;
    return next();
  } catch (error) {
    return next(error);
  }
});

UserSchema.methods.encryptPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  return hashPassword;
};

UserSchema.statics.comparePassword = async (
  password: string,
  recivePassword: string
) => {
  const comparePassword = await bcrypt.compare(password, recivePassword);
  return comparePassword;
};

export const UserModel = model<IUserDocument, IUserModel>('User', UserSchema);
