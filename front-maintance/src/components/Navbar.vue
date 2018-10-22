<template>
  <el-menu v-if="user" :router="true" class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
    <el-menu-item index="/users">Users</el-menu-item>
    <el-menu-item index="/forms">Forms</el-menu-item>
    <el-menu-item index="/upload">Upload</el-menu-item>

    <el-menu-item index="/logout" style="float:right">Logout</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.getters.user;
    },
    level() {
      return this.$store.getters.user ? this.$store.getters.user.level : {};
    }
  }
}
</script>

<style>

</style>
