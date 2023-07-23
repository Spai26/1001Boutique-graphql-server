import { extendResolversFromInterfaces } from '@graphql-tools/schema';
import mongoose, { Document, Model } from 'mongoose';

export interface searchOptions<T> {
  [key: string]: T;
}

export interface optionUser {
  id: searchOptions<string>;
  rol: searchOptions<string>;
}

export interface keyValueData<T> {
  [key: string]: T;
}
