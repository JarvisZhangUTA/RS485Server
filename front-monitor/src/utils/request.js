import axios from 'axios';
import { TokenKey, getToken } from '@/utils/auth';

const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000 // 请求超时时间
})


service.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      config.headers[TokenKey] = token // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

export default service