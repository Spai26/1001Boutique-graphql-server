export const validExtensionImage = (imageurl) => {
  const validExtension = ['jpg', 'png', 'gif', 'jpeg'];
  const extension = imageurl.split('.').pop().toLowerCase();

  return validExtension.includes(extension);
};
