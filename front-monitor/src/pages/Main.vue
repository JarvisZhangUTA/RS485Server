<template>
  <div>
    <el-button> AAA</el-button>
    {{$store.state.user}}
  </div>
</template>

<script>
import { login } from '@/api/user';

export default {
  mounted() {
    // login('zhangjw.uta@gmail.com', 'qgk112358').then(res => {
    //   console.log(res);
    // })
  }
}
</script>

<style>

</style>
