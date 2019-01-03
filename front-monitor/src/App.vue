<template>
  <div id="app">
    <navbar></navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import jwt from 'jsonwebtoken';

import config from '@/config';
import Navbar from '@/components/Navbar';

import { getToken, removeToken } from './utils/auth';

export default {
  name: 'App',
  components: { 
    Navbar 
  },
  mounted() {
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
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}


</style>
