import jwtDecode from "jwt-decode";
import http from "./httpService";

const apiEndpoint = (import.meta.env.VITE_API_ENDPOINT as string) + "/users";
const tokenKey = import.meta.env.VITE_TOKEN_KEY || "";

const token = getJwt();
http.setJwt(token);

type RegisterDataProps = {
  name: string;
  email: string;
  password: string;
  roleId: string;
};

async function login({ email, password }: { email: string; password: string }) {
  const data = await http.post(`${apiEndpoint}/login`, { email, password });
  console.log(data.data);
  localStorage.setItem(tokenKey, data.data.accessToken);
  return data.data;
}

async function register(registerData: RegisterDataProps) {
  const data = await http.post(`${apiEndpoint}/signup`, registerData);
  console.log(data);
  localStorage.setItem(tokenKey, data.data.accessToken);

  return data.data;
}

function loginWithJwt(jwt: string) {
  localStorage.setItem(tokenKey, jwt);
}

function logout() {
  localStorage.removeItem(tokenKey);
}

function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    if (!jwt) {
      return null;
    }
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}
function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  register,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
};
