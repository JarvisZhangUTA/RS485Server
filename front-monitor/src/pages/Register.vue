<template>
  <el-row style="margin: 100px;">
    <el-col :lg="8" :md="6" :sm="4" :xs="0" style="height: 1px;"></el-col>
    <el-col :lg="8" :md="12" :sm="16" :xs="24">
      <el-form style="width:100%;">
        <el-form-item label="Email">
          <el-input v-model="email" type="email"></el-input>
        </el-form-item>
        <el-form-item label="Password">
          <el-input v-model="password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="Confirm Password">
          <el-input v-model="confirm_password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="Invitation code">
          <el-input v-model="invitation_code"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button style="width:100%" type="success" @click="confirm"> Register </el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import { register } from '@/api/user';
import { getToken, setToken } from '@/utils/auth';

export default {
  data() {
    return {
      email: '',
      password: '',
      confirm_password: '',
      invitation_code: ''
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
      if( this.password !== this.confirm_password ) {
        this.$message('Password not match');
        return;
      }
      if( !this.invitation_code ) {
        this.$message('Invitation code needed');
        return;
      }
      
      register(this.email, this.password, this.invitation_code).then(res => {
        if( res.data ) {
          setToken(res.data.token);
          window.location.reload();
        }
      }, err => {
        this.$message( err.response.data );
      });
    }
  },
  mounted() {
    if( getToken() ) {
      this.$router.push('/');
    }
  }
}
</script>

<style>

</style>
