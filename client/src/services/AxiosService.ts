import Axios, { AxiosError } from 'axios'
import { baseURL } from '../env.ts'
import { logger } from '../utils/Logger.ts'

export const api = Axios.create({
  baseURL,
  timeout: 8000
})


const RAWG_API_KEY = '742e72e4a2b242a2a937b84bddd49fd5'

export const rawgApi = Axios.create({
  baseURL: 'https://api.rawg.io/api/',
  timeout: 8000,
  params: {
    key: RAWG_API_KEY
  }
})


api.interceptors.request.use(config => config, handleAxiosError)
api.interceptors.response.use(response => response, handleAxiosError)

rawgApi.interceptors.request.use(config => config, handleAxiosError)
rawgApi.interceptors.response.use(response => response, handleAxiosError)

function handleAxiosError(error: AxiosError): Promise<AxiosError> {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    logger.warn('[📡 AXIOS_ERROR_RESPONSE_DATA]', error.response.data)
  } else if (error.request) {
    // The request was made but no response was received
    logger.warn('[📡 AXIOS_ERROR_NO_RESPONSE]', error.request)
  } else {
    // Something happened in setting up the request that triggered an Error
    logger.warn('[📡 AXIOS_ERROR_INVALID_REQUEST]', error.message)
  }
  return Promise.reject(error)
}
