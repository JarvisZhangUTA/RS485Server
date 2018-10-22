<template>
  <el-row style="margin-top: 10px;">
    <el-col :md="8" :xs="24">
      <el-card class="user-list-card">
        <div v-for="user in users" :key="user.id" @click="selectUser(user)" class="user-list-item" :class="{'selected': user.id === cur_user.id}">
          {{user.email}}
        </div>
        <div class="divider"></div>
      </el-card>

      <el-button v-if="can_add" @click="clear" style="width: 100%; margin-top: 10px;">
        + New User
      </el-button>
    </el-col>
    <el-col :md="16" :xs="24">
        <el-form style="margin: 15px;" label-width="80px">
          <el-form-item label="Email">
            <el-input v-model="cur_user.email"></el-input>
          </el-form-item>
          <el-form-item label="Password">
            <el-input v-model="cur_user.password" type="password"></el-input>
          </el-form-item>
          <el-form-item label="Level">
            <el-select v-model="cur_user.level_id" placeholder="Level" :disabled="!can_add">
              <el-option v-for="item in levels" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button v-if="cur_user.id" type="primary" @click="userUpdate"> Update </el-button>
            <el-button v-else type="success" @click="userCreate"> Create </el-button>
            <el-button v-if="can_add" type="danger" @click="userDelete"> Delete </el-button>
          </el-form-item>
        </el-form>
    </el-col>
  </el-row>
</template>

<script>
import { getUsers, getLevels, updateUser, createUser, deleteUser } from '@/api/user';

export default {
  computed: {
    can_add() {
      let user = this.$store.getters.user;

      if( !user ) return false;
      if( !user.level.user_add ) return false;

      return true;
    }
  },
  data() {
    return {
      levels: [],
      users: [],
      cur_user: {}
    };
  },
  methods: {
    selectUser(user) {
      this.cur_user = user;
    },
    clear() {
      this.cur_user = {};
    },
    userUpdate() {
      if( !this.cur_user.password ) {
        delete this.cur_user.password;
      }
      
      let idx = this.users.indexOf(this.cur_user);
      updateUser(this.cur_user).then(res => {
        this.$message( 'Updated' );
        this.users.splice(idx, 1, res.data);
      }, err => {
        this.$message( err.response.data );
      });
    },
    userCreate() {
      createUser(this.cur_user).then(res => {
        this.$message( 'Created' );
        this.users.push(res.data);
        this.cur_user = res.data;
      }, err => {
        this.$message( err.response.data );
      });
    },
    userDelete() {
      let idx = this.users.indexOf(this.cur_user);
      deleteUser(this.cur_user.id).then(res => {
        this.$message( 'Deleted' );
        this.users.splice(idx, 1);
      }, err => {
        this.$message( err.response.data );
      });
    }
  },
  mounted() {
    getUsers().then(res => {
      this.users = res.data;
      this.cur_user = this.users[0];
    }, err => {
      this.$message( err.response.data );
    });

    getLevels().then(res => {
      this.levels = res.data;
    }, err => {
      this.$message( err.response.data );
    });
  }
}
</script>

<style>
  .divider {
    width: 100%;
    height: 1px;
    background: #DCDFE6;
  }

  .selected {
    background: #EEE;
  }

  .user-list-item {
    padding: 15px;
    cursor: pointer;
  }

  .el-form-item__content {
    text-align: left;
  }

  .user-list-card .el-card__body {
    padding: 0;
  }
</style>
