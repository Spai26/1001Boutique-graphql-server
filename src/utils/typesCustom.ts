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
