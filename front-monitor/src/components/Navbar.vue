<template>
  <el-menu v-if="user" :router="true" class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
    <el-menu-item @click="goto('/')"> Home </el-menu-item>
     <el-menu-item @click="goto('/list')"> List </el-menu-item>
    <!-- <el-menu-item index="/users">Users</el-menu-item>
    <el-menu-item index="/forms">Forms</el-menu-item>
    <el-menu-item index="/upload">Upload</el-menu-item> -->

    <el-submenu style="float:right">
      <template slot="title"> Hello {{user.email}} </template>
      <el-menu-item @click="goto('/user/invitation')"> Invitations </el-menu-item>
      <el-menu-item @click="logout"> Logout </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
import { removeToken } from '@/utils/auth';

export default {
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    logout() {
      removeToken();
      window.location.href="/login";
    },
    goto(path) {
      this.$router.push(path);
    }
  }
}
</script>

<style>

</style>
