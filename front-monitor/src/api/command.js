import request from '@/utils/request';

export function getCommands(params) {
  return request({
    url: '/api/commands',
    method: 'get',
    params: params
  })
}
