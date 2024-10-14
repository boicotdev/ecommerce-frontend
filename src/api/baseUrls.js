const DEBUG = import.meta.env.VITE_APP_DEBUG;
const debugUrl = import.meta.env.VITE_APP_BASE_URL;
const prodUrl = import.meta.env.VITE_APP_BASE_URL_PROD;
const debugImageUrl = import.meta.env.VITE_APP_BASE_IMAGE_URL;

export const apiURL = DEBUG ? debugUrl : prodUrl;
export const apiImageURL = DEBUG ? debugImageUrl : prodUrl;