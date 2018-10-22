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

export function getUsers() {
  return request({
    url: '/api/users',
    method: 'get'
  })
}

export function updateUser(user) {
  return request({
    url: '/api/users',
    method: 'put',
    data: user
  })
}

export function createUser(user) {
  return request({
    url: '/api/users',
    method: 'post',
    data: user
  })
}

export function deleteUser(id) {
  return request({
    url: '/api/users/' + id,
    method: 'delete'
  })
}

export function getLevels() {
  return request({
    url: '/api/levels',
    method: 'get'
  })
}