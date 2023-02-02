import httpService from "./httpService";
// import config from '../config.json'



const apiEndpoint = 'movies'

function getMovieUrl(id) {
  return `${apiEndpoint}/${id}`
}

export function getMovies() {
  return httpService.get(apiEndpoint)
}

export function getMovie(id) {
  return httpService.get(getMovieUrl(id))
}

export function saveMovie(movie) {
  //Update the movie
  if (movie._id) {
    //clone the movie object and delete Id
    const body = { ...movie }
    delete body._id
    console.log(body);
    httpService.put(getMovieUrl(movie._id), body)
    return
  }
  httpService.post(apiEndpoint, movie)
}


export function deleteMovie(movieId) {
  return httpService.delete(getMovieUrl(movieId))
}