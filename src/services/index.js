import axios from 'axios'
import { getLocalStorage } from '../utils/helper'
import { HEADER, SESSION } from '../utils/constants'

const instance = axios.create({
  headers: {
    [`${HEADER.TOKEN}`]: `${HEADER.BEARER} ${getLocalStorage(SESSION.TOKEN)}`,
    'Content-Type': HEADER.CONTENT_TYPE
  },
  timeout: HEADER.TIMEOUT
})

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  function (response) {
    // Log the successful response
    // console.log('Successful Response:', response);
    return response;
  },
  function (error) {
    // Log the error response
    // console.error('Error Response:', error.response);
    // return Promise.reject(error && error.response);
    return error && error.response
  }
);


// // Add a response interceptor
// instance.interceptors.response.use(
//   function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     const { data, status } = response
//     return { data, status }
//   },
//   function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     return Promise.reject(error)
//   }
// )

export default instance
