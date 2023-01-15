import axios from 'axios';
import { MOVIE_DB_API_KEY } from '@env';

export const BASED_URL = 'https://api.themoviedb.org/3'
export const BASED_IMAGE_URL = 'https://image.tmdb.org/t/p/w200'
const API_KEY = MOVIE_DB_API_KEY

export function httpGet(path:string) {
    return axios({
        method: 'get',
        url: `${BASED_URL}${path}`,
        responseType: 'json',
        params: {
            api_key: API_KEY
        }
      })
}

export function imagePath(path:string) {
    return `${BASED_IMAGE_URL}${path}`
    
}