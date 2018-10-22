<template>
  <div id="app">
    <navbar></navbar>
    <router-view/>
  </div>
</template>

<script>
import '@/utils/quagga_adapter';

import jwt from 'jsonwebtoken';
import config from '@/config';

import { getToken, removeToken } from './utils/auth';

import Navbar from '@/components/Navbar';

export default {
  name: 'App',
  components: {
    Navbar
  },
  created() {
    let token = getToken();
    if( token ) {
      jwt.verify(token, config.jwt_secret, (err, decoded) => {
        if( err ) {
          removeToken();
          this.$router.push('/login');
        } else {
          this.$store.dispatch('setUser', decoded)
        }
      });
    } else if( this.$route.path !== '/login' ){
      this.$router.push('/login');
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
