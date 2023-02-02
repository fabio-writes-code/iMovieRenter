import httpService from "./httpService";
// import config from '../config.json'
import jwtDecode from "jwt-decode";





const apiEndpoint = 'auth'
const tokenKey = 'token'

httpService.setJwt(getJwt())

export async function login(email, password) {
  //changing variable names to match de backend
  const { data: jwt } = await httpService.post(apiEndpoint, {
    email,
    password
  })
  localStorage.setItem('token', jwt)
  return
}

export function logout() {
  localStorage.removeItem(tokenKey)
}

//for newly registered users
export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt)
}

export function getCurrentUser() {
  try {
    // retrieves the token
    const token = localStorage.getItem(tokenKey)

    //Decode token
    console.log(jwtDecode.token)
    return jwtDecode(token)

  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey)
}

export default {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
  getJwt
}

