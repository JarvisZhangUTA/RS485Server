<template>
  <el-row>
    <el-col :lg="8" :md="6" :sm="4" :xs="0" style="height: 1px;"></el-col>
    <el-col :lg="8" :md="12" :sm="16" :xs="24">
      <el-form style="width:100%;">
        <el-form-item label="Email">
          <el-input v-model="email" type="email"></el-input>
        </el-form-item>
        <el-form-item label="Password">
          <el-input v-model="password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%" type="success" @click="confirm"> Login </el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import { login } from '@/api/user';
import { getToken, setToken } from '@/utils/auth';

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    confirm() {
      if( !this.email ) {
        this.$message('Email needed');
        return;
      }
      if( !this.password ) {
        this.$message('Password needed');
        return;
      }
      
      login(this.email, this.password).then(res => {
        if( res.data ) {
          setToken(res.data.token);
          this.$router.push('/forms');
        }
      }, err => {
        this.$message( err.response.data );
      });
    }
  },
  mounted() {
    if( getToken() ) {
      this.$router.push('/forms');
    }
  }
}
</script>

<style>

</style>
