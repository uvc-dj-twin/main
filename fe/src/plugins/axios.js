import axios from 'axios';

export default {
  install: (app) => {
    const instance = axios.create({
      baseURL: process.env.VUE_APP_API_BASE_URL,
      withCredentials: true
    });
    instance.interceptors.request.use(
      (config) => {
        // 로컬 스토리지에서 토큰을 가져와서 헤더에 추가합니다.
        const token = localStorage.getItem('token');
        if (token) {
          config.headers['authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    instance.interceptors.response.use(response => {
      return response;
    }, async error => {
      const originalRequest = error.config;
      if (error.response.status === 403) {
        const response = await instance.post('auth/token', {}, { withCredentials: true });
        const newAccessToken = response.data.token;
        localStorage.setItem('token', newAccessToken);
        originalRequest.headers.authorization = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      }
      return Promise.reject(error);
    });
    console.log(instance);
    app.config.globalProperties.$axios = instance;
    app.provide('axios', instance);
  }
};
