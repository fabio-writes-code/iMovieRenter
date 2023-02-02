import httpService from "./httpService";
// import config from '../config.json'



const apiEndpoint = 'users'

export function register(user) {
  //changing variable names to match de backend
  return httpService.post(apiEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name,
  })
}
