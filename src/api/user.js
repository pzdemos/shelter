import request from '../utils/request';

// 用户登录
export const login = (data) => {
  return request.post('/admin/user/login', data);
};

// 获取用户信息
export const getUserInfo = () => {
  return request.get('/admin/user/info');
};

// 用户登出
export const logout = () => {
  return request.post('/admin/user/logout');
};
