import { ITest, ITestDocument } from '@interfaces/testing';
import { Model, Schema, model } from 'mongoose';

const TesSchema = new Schema<ITestDocument, Model<ITest>>({
  image: { type: Schema.Types.ObjectId, ref: 'Image' },
  gallery: [{ type: Schema.Types.ObjectId, ref: 'Image' }]
});

export const TestModel = model<ITestDocument, Model<ITest>>('Test', TesSchema);
