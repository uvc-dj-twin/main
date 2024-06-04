// // stores/user.js
// import { defineStore } from 'pinia'

// export const useUserStore = defineStore('user', {
//   state: {
//     userData: null // 초기값 null 설정
//   },
//   actions: {
//     async login(email, password) {
//       try {
//         const response = await fetch('http://localhost:5000/login', {
//           method: 'POST',
//           body: { email, password }
//         });
//         const data = await response.json();
//         console.log(data);

//         // Pinia 스토어에 userData 업데이트
//         this.userData = data;
//       } catch (error) {
//         console.error(error);
//       }
//     }
//   }
// })
