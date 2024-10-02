const debug = import.meta.VITE_APP_DEBUG;
const baseURL = import.meta.VITE_APP_DEBUG_URL;
const prodUrl = import.meta.VITE_APP_PROD_URL;

export const apiURL = debug ? baseURL : prodUrl;