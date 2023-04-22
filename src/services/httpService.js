
import axios from 'axios'
// import auth from './authService' -> avoid interdependencies

// Moved to setJwt function to avoid bi-directional dependencies
// axios.defaults.headers.common['x-auth-token'] = auth.getJwt()
axios.defaults.baseURL = process.env.REACT_APP_API_URL

console.log(axios.defaults.baseURL);

axios.interceptors.response.use(null, error => {

  const expectedError = error.response && error.response.status >= 400 && error.response.status <= 500

  //Handling Unexpected erros
  if (!expectedError) {
    console.log('Logging error', error)

    //Logging with sentry
    // Sentry.captureEvent(error)

    // toast.error('Unexpected error')
  }

  //for both expected and unexpected errors
  return Promise.reject(error)
})

function setJwt(jwt) {
  axios.defaults.headers.common['x-auth-token'] = jwt
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
}