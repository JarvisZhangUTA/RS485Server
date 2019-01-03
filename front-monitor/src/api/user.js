import request from '@/utils/request';

export function login(email, password) {
  return request({
    url: '/api/users/login',
    method: 'post',
    data: {
      email,
      password
    }
  })
}

export function register(email, password, invitation_code) {
  return request({
    url: '/api/users/register',
    method: 'post',
    data: {
      email,
      password,
      invitation_code
    }
  })
}

export function getInvitations() {
  return request({
    url: '/api/users/invitations',
    method: 'get'
  })
}

export function createInvitations() {
  return request({
    url: '/api/users/invitations',
    method: 'post'
  })
}