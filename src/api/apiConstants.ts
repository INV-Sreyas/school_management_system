export const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const API_ENDPOINTS = {
  REGISTER: `${BASE_URL}/register/`,
  LOGIN: `${BASE_URL}accounts/login/`,
  STUDENTS: `${BASE_URL}/students/`,
  TEACHERS: `${BASE_URL}/teachers/`,
};
