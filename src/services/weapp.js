import request from '@/utils/request';
import bodyParse from '@/utils/bodyParse'

//门店列表
export async function store(params) {
  return request('/api/store' + bodyParse(params));
}

//创建门店
export async function addstore(params) {
  return request('/api/store', {
    method: 'POST',
    data: params,
  });
}

//更新门店
export async function editstore(params) {
  return request('/api/store/' + params.id, {
    method: 'PUT',
    data: params,
  });
}

//删除门店
export async function deletestore(params) {
  return request('/api/store/' + params, {
    method: 'DELETE',
  });
}


//工厂列表
export async function factory(params) {
  return request('/api/factory' + bodyParse(params));
}

//创建工厂
export async function addfactory(params) {
  return request('/api/factory', {
    method: 'POST',
    data: params,
  });
}

//更新工厂
export async function editfactory(params) {
  return request('/api/factory/' + params.id, {
    method: 'PUT',
    data: params,
  });
}

//删除工厂
export async function deletefactory(params) {
  return request('/api/factory/' + params, {
    method: 'DELETE',
  });
}



//当前用户信息
export async function queryCurrent() {
  return request('/api/user/info');
}

export async function queryNotices() {
  return request('/api/notices');
}
