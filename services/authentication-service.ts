import { User } from "@/utils/types";
import { postService } from "./services";

const baseUrl = 'http://localhost:5000/auth';

export const useAuthentication = () => ({
  login: (user: {[key: string]: any}) => postService(`${baseUrl}/login`, user),
  signup: (user: {[key: string]: any}) => postService(`${baseUrl}/signup`, user),
  verifyUser: (id: string, code: string) => postService(`${baseUrl}/verifyPlayer/${id}/${code}`)
})