import axios from 'axios';
const baseURL = process.env.CARTOLA_URL ?? 'https://api.cartola.globo.com';
export const api = axios.create({ baseURL, timeout: 7000 });
export default api;