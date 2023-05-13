import { User } from "@/utils/types";
import { postRequest } from "./services";

const baseUrl = 'http://localhost:5000/auth';

export const useAuthentication = () => ({
  login: (user: {[key: string]: any}) => postRequest(`${baseUrl}/login`, user),
  signup: (user: {[key: string]: any}) => postRequest(`${baseUrl}/signup`, user),
  verifyUser: (id: string, code: string) => postRequest(`${baseUrl}/verifyPlayer/${id}/${code}`),
  forgotPassword: (email: string) => postRequest(`${baseUrl}/forgotPassword/${email}`),
  resetPassword: (email: string, code: string) => postRequest(`${baseUrl}/resetPassword/${email}/${code}`),
  updatePassword: (email: string, password: string) => postRequest(`${baseUrl}/updatePassword/${email}`, { password }),
})