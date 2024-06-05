import io from 'socket.io-client';

export default {
  install: (app,{host}) =>{
    const jwtToken ='Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6Iu2Zjeq4uOuPmSIsInJvbGUiOm51bGwsImlhdCI6MTcxNzU0NzIxNSwiZXhwIjoxNzQ2MzQ3MjE1fQ.WGAr3joPF9jBCuHFG3OqfXRnZe5wIjw4smLU4e6TSdQ';
    // console.log("host",host)
    // console.log("host",host)
    // console.log("host",host)
    // console.log("host",host)
    // console.log("host",host)
    // console.log("host",host)

    const socketClient = io(`${host}`, {
      

      extraHeaders: {
        authorization:jwtToken,
      }


    });
    app.config.globalProperties.$socket = socketClient;
    app.provide('socket', socketClient);
  }
}