<template>
  <el-row>
    <el-col :offset="4" :lg="16" :sm="xs">
      <div style="margin: 10px 0;">
        <el-button size="mini" type="success" @click="createInvitation">
          Generate an invitation code <i v-if="generating" class="el-icon-loading"></i>
        </el-button>
      </div>

      <table class="normal-table">
        <thead>
          <tr> <th> Invitation Code </th> <th> Used By </th> </tr>
        </thead>

        <tbody>
          <tr v-for="(item, idx) in invitations" :key="idx">
            <td>
              <span class="invotation-code"> {{item.code.substr(0, 4)}} {{item.code.substr(4)}} </span>
              <span class="copy" @click="copy(item.code)"> COPY </span>
            </td>
            <td>
              {{item.active_user ? item.active_user : 'NOT USED'}}
            </td>
          </tr>

          <tr v-if="invitations.length == 0 && !loading">
            <td :colspan="2" style="text-align: center">
              NO DATA
            </td>
          </tr>

          <tr v-if="loading">
            <td :colspan="2" style="text-align: center">
              <i class="el-icon-loading"></i>
            </td>
          </tr>
        </tbody>
      </table>
    </el-col>
  </el-row>
</template>

<script>
import { getInvitations, createInvitations } from '@/api/user';

export default {
  data() {
    return {
      generating: false,
      loading: false,

      invitations: []
    }
  },
  methods: {
    createInvitation() {
      this.generating = true;
      createInvitations().then(res => {
        this.generating = false;
        this.invitations.unshift( res.data )
      }, err => {
        thios.generating = false;
      })
    },
    copy(code) {
      navigator.clipboard.writeText( code ).then(() => {
        this.$message({ message: 'Invitation Code Copied' });
      });
    }
  },
  mounted() {
    this.loading = true;
    getInvitations().then(res => {
      this.loading = false;
      this.invitations = res.data;
    }, err => {
      this.loading = false;
    });
  }
}
</script>

<style>
.invotation-code {
  font-size: 15px;
  font-weight: bold;
}

.copy {
  float: right;
  cursor: pointer;
}
</style>
