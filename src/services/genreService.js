import httpService from "./httpService";
import config from '../config.json'



const apiEndpoint = 'genres'

export function getGenres() {
  return httpService.get(apiEndpoint)
}
