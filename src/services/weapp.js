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



//创建关键词
export async function addkeyword(params) {
  return request('/api/keyword', {
    method: 'POST',
    data: params,
  });
}

//更新关键词
export async function editkeyword(params) {
  return request('/api/keyword/' + params.id, {
    method: 'PUT',
    data: params,
  });
}

//获取分类
export async function getclassify(params) {
  return request('/api/max_classify' + bodyParse(params));
}


//获取关键词
export async function getkeyword(params) {
  return request('/api/keyword' + bodyParse(params));
}

//创建大类
export async function addmax_classify(params) {
  return request('/api/max_classify', {
    method: 'POST',
    data: params,
  });
}

//更新大类
export async function editmax_classify(params) {
  return request('/api/max_classify/' + params.id, {
    method: 'PUT',
    data: params,
  });
}

//删除大类
export async function deletemax_classify(params) {
  return request('/api/max_classify/' + params, {
    method: 'DELETE',
  });
}
//创建小类
export async function addmin_classify(params) {
  return request('/api/min_classify', {
    method: 'POST',
    data: params,
  });
}

//更新小类
export async function editmin_classify(params) {
  return request('/api/min_classify/' + params.id, {
    method: 'PUT',
    data: params,
  });
}

//删除小类
export async function deletemin_classify(params) {
  return request('/api/min_classify/' + params, {
    method: 'DELETE',
  });
}

//创建客服
export async function addcustomer(params) {
  return request('/api/customer', {
    method: 'POST',
    data: params,
  });
}

//更新客服
export async function editcustomer(params) {
  return request('/api/customer/' + params.id, {
    method: 'PUT',
    data: params,
  });
}

//删除客服
export async function deletecustomer(params) {
  return request('/api/customer/' + params, {
    method: 'DELETE',
  });
}



//创建岗位
export async function addjob(params) {
  return request('/api/job', {
    method: 'POST',
    data: params,
  });
}

//更新岗位
export async function editjob(params) {
  return request('/api/job/' + params.id, {
    method: 'PUT',
    data: params,
  });
}

//审核
export async function enrollverify(params) {
  return request('/api/enroll/verify', {
    method: 'PUT',
    data: params,
  });
}


//入职
export async function enrollset_working(params) {
  return request('/api/enroll/set_working', {
    method: 'PUT',
    data: params,
  });
}

//离职
export async function enrollquit(params) {
  return request('/api/enroll/quit', {
    method: 'PUT',
    data: params,
  });
}

//删除岗位
export async function deletejob(params) {
  return request('/api/job/' + params, {
    method: 'DELETE',
  });
}

//获取工作详情
export async function getjob(params) {
  return request('/api/job/' + params);
}

//当前用户信息
export async function queryCurrent() {
  return request('/api/user/info');
}

export async function queryNotices() {
  return request('/api/notices');
}
