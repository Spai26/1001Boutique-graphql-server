import mongoose, { Document } from 'mongoose';

export interface IBlog {
  title: string;
  body_content: string;
  front_image: mongoose.Types.ObjectId; // ref 'image'
  slug_title: string;
  count_view: number;
  author: mongoose.Types.ObjectId; // ref 'user'
  status: boolean;
  origin: string;
}

export interface IBlogDocument extends IBlog, Document {}
