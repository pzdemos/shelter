import request from '../utils/request';

// 用户登录
export const login = (data) => {
  return request.post('/auth/login', data);
};

// 刷新 token
export const refreshToken = (refreshToken) => {
  return request.post('/auth/refresh', { refreshToken });
};

// 获取当前用户信息
export const getUserInfo = () => {
  return request.get('/auth/me');
};

// 用户登出 (前端清除 token 即可，后端无状态 JWT 不需要特定登出接口，除非有黑名单)
export const logout = () => {
  // 如果后端有登出接口可以调用，这里暂时保留
  // return request.post('/auth/logout');
  return Promise.resolve();
};

// 获取用户列表
export const getUsers = (params) => {
  return request.get('/users', { params });
};

// 获取单个用户
export const getUserById = (id) => {
  return request.get(`/users/${id}`);
};

// 创建用户
export const createUser = (data) => {
  return request.post('/users', data);
};

// 更新用户
export const updateUser = (id, data) => {
  return request.put(`/users/${id}`, data);
};

// 更新密码
export const updatePassword = (id, password) => {
  return request.patch(`/users/${id}/password`, { password });
};

// 删除用户
export const deleteUser = (id, hard = false) => {
  return request.delete(`/users/${id}`, { params: { hard } });
};

// 批量更新状态
export const batchUpdateStatus = (userIds, is_active) => {
  return request.patch('/users/batch/status', { userIds, is_active });
};

// 获取统计信息
export const getUserStats = () => {
  return request.get('/users/stats/summary');
};
