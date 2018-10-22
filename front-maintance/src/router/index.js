import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/pages/Login';
import Logout from '@/pages/Logout';
import Users from '@/pages/Users';
import Forms from '@/pages/Forms';
import Upload from '@/pages/Upload';

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/forms' },
    { path: '/login', name: 'Login', component: Login },
    { path: '/logout', name: 'Logout', component: Logout },
    { path: '/users', name: 'Users', component: Users },
    { path: '/forms', name: 'Forms', component: Forms },
    { path: '/upload', name: 'Upload', component: Upload },
    { path: '*', redirect: '/' }
  ],
  mode: 'history'
})
