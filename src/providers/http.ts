import axios from 'axios'

const BASE_URL = 'http://stage.whgstage.com/front-end-test'

export const http = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' }
})
