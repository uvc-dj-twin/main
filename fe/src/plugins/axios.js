import axios from 'axios';

export default {
  install: (app) => {
    const instance = axios.create({
      baseURL: process.env.VUE_APP_API_BASE_URL,
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
    console.log(instance);
    app.config.globalProperties.$axios = instance;
    app.provide('axios', instance);
  }
};
