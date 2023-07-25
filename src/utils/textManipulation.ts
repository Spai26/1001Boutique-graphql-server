export const removeExtends = (filename: string) => {
  return filename.split('.').shift();
};

export const generateSlug = (data: string) => {
  return data
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
};
