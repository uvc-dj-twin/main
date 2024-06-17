import axios from 'axios';

export default {
  install: (app) => {
    const instance = axios.create({
      baseURL: process.env.VUE_APP_API_BASE_URL,
    });
    console.log(instance);
    app.config.globalProperties.$axios = instance;
    app.provide('axios', instance);
  }
};
