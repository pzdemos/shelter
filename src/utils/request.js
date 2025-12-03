import axios from 'axios';
import { message } from 'antd';

const request = axios.create({
  baseURL:  window.location.origin.includes('localhost') ? 'http://localhost:5173/api' : 'https://z-gemini.deno.dev/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const { response } = error;
    
    // 处理 401 未认证错误
    if (response?.status === 401) {
      message.error(response?.data?.message || '认证失败，请重新登录');
      // 清除本地存储的认证信息
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      // 重定向到登录页，并携带当前路径
      const currentPath = window.location.pathname;
      if (currentPath !== '/login') {
        window.location.href = `/login?redirect=${encodeURIComponent(currentPath)}`;
      }
    } else {
      message.error(response?.data?.message || '请求失败');
    }
    
    return Promise.reject(error);
  }
);

export default request;
