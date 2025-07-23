export const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const API_ENDPOINTS = {
  REGISTER_TEACHER: `${BASE_URL}school/teachers/create/`,
  LOGIN: `${BASE_URL}accounts/login/`,
  STUDENTS: `${BASE_URL}students/`,
  VIEW_TEACHERS: `${BASE_URL}school/teachers/`,
};
