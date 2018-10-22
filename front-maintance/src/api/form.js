import request from '@/utils/request';

export function getParts() {
  return request({
    url: '/api/parts',
    method: 'get'
  })
}

export function uploadImage(file) {
  let formData = new FormData();
  formData.append('image', file);

  return request({
    url: '/api/images',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: formData
  });
}

export function createForm(data) {
  return request({
    url: '/api/replacements',
    method: 'post',
    data: data
  })
}

export function getForms(params = {}) {
  return request({
    url: '/api/replacements',
    method: 'get',
    params: params
  })
}