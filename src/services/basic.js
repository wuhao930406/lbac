import request from '@/utils/request';

export async function setenable(params) {
  return request('/api/user/set_enable', {
    method: 'PUT',
    data: params,
  });
}
export async function queryCurrent() {
  return request('/api/user/info');
}
export async function queryNotices() {
  return request('/api/notices');
}
