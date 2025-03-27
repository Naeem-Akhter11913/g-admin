export const BASE_URL =
  import.meta.env.VITE_DEVELOPMENT_TYPE === "development"
    ? import.meta.env.VITE_DEV_BASE_URL
    : import.meta.env.VITE_PROD_BASE_URL;

export const PERSONAL_API_KEY =
  import.meta.env.VITE_DEVELOPMENT_TYPE === "development"
    ? import.meta.env.VITE_DEV_PERSONAL_API_KEY
    : import.meta.env.VITE_PROD_PERSONAL_API_KEY;

export const VITE_DEV_TYNYMCE_API = import.meta.env.VITE_DEVELOPMENT_TYPE === "development"
  ? import.meta.env.VITE_DEV_TYNYMCE_API
  : import.meta.env.VITE_PROD_TYNYMCE_API;