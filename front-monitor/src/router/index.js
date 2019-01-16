import Vue from 'vue'
import Router from 'vue-router'

import Main from '@/pages/Main'
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Invitation from '@/pages/User/Invitation';
import List from '@/pages/Command/List';

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'Main', component: Main },
    { path: '/login', name: 'Login', component: Login },
    { path: '/register', name: 'Register', component: Register },
    { path: '/user/invitation', name:'Invitation', component: Invitation },
    { path: '/list', name:'List', component: List },
    { path: '*', redirect: '/' }
  ],
  mode: 'history'
})
