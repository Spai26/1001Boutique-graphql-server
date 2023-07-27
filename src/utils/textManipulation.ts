/**
 * * remove the file extension from a given filename and return the filename without the extension
 * @param filename
 * @returns
 */
export const removeExtends = (filename: string): string => {
  return filename.split('.').shift();
};

/**
 * * take a string input and convert it into a URL-friendly slug format
 * @param data
 * @returns slugString
 */
export const generateSlug = (data: string): string => {
  return data
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
};
