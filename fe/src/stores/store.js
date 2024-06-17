// store.js

import { createStore } from 'vuex';

const useStore = createStore({
  state: {
    isLoggedIn: false,
    userId: null,
    name: '고길동',
    groupName: 'OPC',
    dummy:false,
    equipmentlist: ['L-SF-04'],
    failCount:0,

  },
  mutations: {
    login(state, user) {
      state.isLoggedIn = true;
      state.userId = user.id;
      state.name=user.name;
      state.token=user.token;
      localStorage.setItem('token', user.token);
    },
    logout(state) {
      state.isLoggedIn = false;
      state.userId = null;
      state.name=null;
      state.token=null;
      localStorage.removeItem('token');
    },
    nochange(state) {
      state.dummy=false;
    },
    checkAlarm(state,failCount) {
      state.failCount=failCount;
    },


    
    // loadEquipment(state, equipmentlist) {
    //   state.equipmentlist = equipmentlist
    // },
   
  },
  actions: {
    // 비동기 작업으로 서버에 사용자 인증 요청을 보내는 함수
    // 비동기 함수 login을 정의합니다. 이 함수는 두 개의 매개변수를 받습니다.
    // 첫 번째 매개변수는 객체 분해를 사용하여 commit이라는 이름의 변수로 
    // Vuex 스토어의 commit 메서드를 받습니다. 
    // 두 번째 매개변수는 객체 분해를 사용하여 email과 password라는 이름의 변수로 전달됩니다. 
    // 이 매개변수들은 사용자의 이메일 주소와 비밀번호를 나타냅니다.

    // async login22({ commit }, { email, password }) {
    //   const dummy1=email;
    //   const dummy2=password;

    //   if (dummy1,dummy2) {
    //     console.log("dummy fin")
    //   }

      
    //     const user = {
    //       email:'uvc@uvc.com',
    //       name:'유비',
    //       group:'opc',
    //       role:'admin',
    //     };
    //     commit('login', user);
    //   },
    async login({ commit }, { email, password }) { //객체를 받아와 개별 변수로 저장
      try {
        // 서버 주소 설정
        const response = await fetch(`${process.env.VUE_APP_API_BASE_URL}/auth/sign-in`, {
          method: 'POST', // HTTP 메소드 설정
          headers: {
            'Content-Type': 'application/json' // 컨텐츠 타입 설정
          },
          body: JSON.stringify({ email, password }) // 요청 본문 설정
          
        });

        if (response.ok) {
          // 서버 인증 성공시 사용자 정보를 받아온다
          const user = await response.json();
          commit('login', user);
        } else {
          // 인증 실패 시 예외 처리
          throw new Error('로그인 실패');
        }
      } catch (error) {
        console.error(error.message); // 에러 메시지를 콘솔에 출력한다
        throw error; // 에러를 전파한다
      }
    },
    async register({ commit }, { email, password, name,phone}) { //객체를 받아와 개별 변수로 저장
      try {
        // 서버 주소 설정
        const response = await fetch(`${process.env.VUE_APP_API_BASE_URL}/users`, {
          method: 'POST', // HTTP 메소드 설정
          headers: {
            'Content-Type': 'application/json' // 컨텐츠 타입 설정
          },
          body: JSON.stringify({ email, password,name,phone }) // 요청 본문 설정
        });

        if (response.ok) {
          // 가입 성공시 상태변동 없이 종료
          // const user = await response.json();
          // commit('login', user);
          commit('no-change');
          console.log('가입완료 ')
        } else {
          // 인증 실패 시 예외 처리
          throw new Error('가입 실패');
        }
      } catch (error) {
        console.error(error.message); // 에러 메시지를 콘솔에 출력한다
        throw error; // 에러를 전파한다
      }
    },
    // 사용자 로그아웃 처리 함수
    logout({ commit }) {
      commit('logout');
    },
    async userEdit({ commit, state }, {  password,phone }) { //객체를 받아와 개별 변수로 저장
      try {
        // 서버 주소 설정
        const response = await fetch(`${process.env.VUE_APP_API_BASE_URL}/auth/users/${state.user.id}`, {
          method: 'POST', // HTTP 메소드 설정
          headers: {
            'Content-Type': 'application/json' // 컨텐츠 타입 설정
          },
          body: JSON.stringify({ password,phone }) // 요청 본문 설정
          
        });

        if (response.ok) {
          // 서버 인증 성공시 사용자 정보를 받아온다
          const editedUser = {password:password,phone:phone};
          commit('login', editedUser);
        } else {
          // 인증 실패 시 예외 처리
          throw new Error('로그인 실패');
        }
      } catch (error) {
        console.error(error.message); // 에러 메시지를 콘솔에 출력한다
        throw error; // 에러를 전파한다
      }
    },
    async load_equipment({ commit }, { groupName }) {
      // try {
      //   // 서버 주소 설정
      //   const response = await fetch('http://192.168.0.64:3000/auth/sign-in', {
      //     method: 'GET', // HTTP 메소드 설정
      //     headers: {
      //       'Content-Type': 'application/json' // 컨텐츠 타입 설정
      //     },
      //     body: JSON.stringify({ groupName }) // 요청 본문 설정
          
      //   });

      //   if (response.ok) {
      //     // 서버 인증 성공시 그룹의 장비 정보를 받아온다
      //     const groupList = await response.json();
      //     commit('loadEquipment', groupList); // Mutation loadEquipment실행, groupList를 전달
      //   } else {
      //     // 인증 실패 시 예외 처리
      //     throw new Error('장비정보 확인 실패');
      //   }
      // } catch (error) {
      //   console.error(error.message); // 에러 메시지를 콘솔에 출력한다
      //   throw error; // 에러를 전파한다
      // }
      console.log(groupName)
      const groupList = ['L-SF-04','L-SF-05','L-SF-06']
       commit('loadEquipment', groupList); // Mutation loadEquipment실행, groupList를 전달
    },
    checkAlarm({ commit }) {
      commit('checkAlarm');
    },
  },
  getters: {
    // 현재 로그인된 사용자 정보를 반환하는 getter
    currentUser: (state) => state.user
  }
});
export default useStore;

