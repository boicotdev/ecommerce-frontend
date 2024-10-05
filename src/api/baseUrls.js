const DEBUG = import.meta.VITE_APP_DEBUG;
const debugUrl = import.meta.env.VITE_APP_BASE_URL;
const prodUrl = import.meta.env.VITE_APP_BASE_URL_PROD;

export const apiURL = DEBUG ? debugUrl : prodUrl;
