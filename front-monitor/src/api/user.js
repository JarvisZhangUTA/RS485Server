import request from '@/utils/request';

export function login(email, password) {
  return request({
    url: '/api/login',
    method: 'post',
    data: {
      email,
      password
    }
  })
}