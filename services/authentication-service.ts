import { User } from "@/utils/types";

const baseUrl = 'http://localhost:5000/auth';

const login = async (user: {[key: string]: any}) => {
  const url = `${baseUrl}/login`;
  const JSONdata = JSON.stringify(user);

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSONdata,
  };

  const response = await fetch(url, options);
  
  let result;
  try {
    result = await response.json();
  } catch (e) {
    result = null;
  }
  
  return result;
}

const signup = async (user: {[key: string]: any}) => {
  const url = `${baseUrl}/signup`;
  const JSONdata = JSON.stringify(user);

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSONdata,
  };

  const response = await fetch(url, options);
  const result = await response.json();

  return result
}

const verifyUser = async (id: string, code: string) => {
  const url = `${baseUrl}/verifyPlayer/${id}/${code}`;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  };

  const response = await fetch(url, options);
  let result;
  try {
    result = await response.json();
  } catch (e) {
    result = null;
  }
  
  return result;
}

const authenticationService = { login, signup, verifyUser }
export default authenticationService;