const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

export const getImageUrl = (path) => {
  if (!path) return null;
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  return `${IMAGE_BASE_URL}${path}`;
};

export default getImageUrl;
