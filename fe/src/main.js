

/////
import { createApp } from "vue";
import { createWebHistory, createRouter } from "vue-router";
import { registerLicense } from '@syncfusion/ej2-base'; //캘린더 라이센스

// styles

import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/assets/styles/tailwind.css";

// mouting point for the whole app

import App from "@/App.vue";

// layouts

import DashboardLayout from "@/layouts/Dashboard.vue";
import DataRead from "@/layouts/DataRead.vue";
import Admin from "@/layouts/Admin.vue";




import Auth from "@/layouts/Auth.vue";
// views for Admin layout

import Dashboard from "@/views/admin/Dashboard.vue";




/////////레거시///
// views for Auth layout 

import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";

// views without layouts
import MyPage from "@/views/MyPage.vue"
//views for dataread

import Statistics from "@/views/dataread/Statistics.vue";
import Details from "@/views/dataread/Details.vue";


// views for admin

import EquipmentMng from "@/views/admin/EquipmentMng.vue";
import GroupMng from "@/views/admin/GroupMng.vue";

//달력 테스트 


// routes

///////socket test//
import socketPlugin from './plugins/socketPlug';
import {host} from './config';


const routes = [
  {
    path: "/",
    redirect: "/dashboard",
    component: DashboardLayout,
    children: [
      {
        path: "/dashboard",
        component: Dashboard,
      },
      {
        path: "/mypage",
        component: MyPage,
      },
    ],
  },
  
  {
    path: "/dataread", // layouts/dataread
    redirect:"/dataread/statistics",
    component: DataRead,
    children: [
      {
        path: "/dataread/statistics", //views/
        component: Statistics,
      },
      {
        path: "/dataread/details",
        component: Details,
      },
    ],
  },
  {
    path: "/auth",
    redirect: "/auth/login",
    component: Auth,
    children: [
      {
        path: "/auth/login",
        component: Login,
      },
      {
        path: "/auth/register",
        component: Register,
      },
    ],
  },

  {
    path: "/admin",
    redirect: "/admin/groupMng",
    component: Admin,
    children: [
      {
        path: "/admin/groupMng",
        component: GroupMng,
      },
      {
        path: "/admin/equipmentMng",
        component: EquipmentMng,
      },
    ],
  },












  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App)

registerLicense('Ngo9BigBOggjHTQxAR8/V1NBaF1cXmhOYVBpR2Nbe05xflRDal5YVAciSV9jS3pTcEVgWX5fdXdVRGJVWQ==');

//socket 사용추가 
app.use(router);
app.use(socketPlugin, {host})


app.mount("#app");

