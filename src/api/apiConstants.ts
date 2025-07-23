export const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const API_ENDPOINTS = {
  REGISTER_TEACHER: `${BASE_URL}school/teachers/create/`,
  LOGIN: `${BASE_URL}accounts/login/`,
  REGISTER_STUDENTS: `${BASE_URL}school/students/create/`,
  VIEW_TEACHERS: `${BASE_URL}school/teachers/`,
};
