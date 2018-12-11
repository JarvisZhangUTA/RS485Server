<template>
  <el-container style="height: calc(100vh);">
    <el-container>
      <el-aside width="300px" style="border-right: 1px solid #DCDFE6;">
        
        <div class="list-title"> Users </div>

        <div v-for="user in users" :key="user" class="list-item">
          {{user}}
        </div>

        <div class="list-title"> Devices </div>

        <div v-for="device in devices" :key="device" class="list-item">
          {{device}}
        </div>
      </el-aside>
      <el-main style="padding: 0;">
        <div class="list-title"> Messages </div>

        <div class="message-section">
          <template v-for="(message, idx) in messages">
            <div v-if="message.type==='message'" :key="idx" class="message">
              {{message.data}} FROM {{message.addr}}
            </div>
            <div v-if="message.type==='ack'" :key="idx" class="ack">
              {{message.data}}
            </div>
            <div v-if="message.type==='error'" :key="idx" class="error">
              {{message.data}}
            </div>
          </template>

          <div v-if="messages.length === 0" class="ack">
            NO DATA RECEIVED
          </div>
        </div>
      </el-main>
    </el-container>
    <el-footer style="padding: 0; border-top: 1px solid #DCDFE6; height: 41px;" class="footer">
      <el-container>
        <el-aside width="300px">
          <el-select v-model="cur_device" placeholder="Send to" style="width: 100%;">
            <el-option v-for="device in devices" :key="device" :label="device" :value="device"></el-option>
          </el-select>
        </el-aside>

        <el-main style="padding: 0;">
          <el-input v-model="new_message" placeholder="Message">
            <el-button slot="append" icon="el-icon-check" @click="sendMessage"></el-button>
          </el-input>
        </el-main>
      </el-container>
    </el-footer>
  </el-container>
</template>

<script>
import { login } from '@/api/user';

export default {
  data() {
    return {
      ws: null,
      users: [],
      devices: [],
      messages: [],
      cur_device: '',
      new_message: ''
    }
  },
  methods: {
    init() {
      this.ws = new WebSocket('ws://206.189.166.192:8080');

      this.ws.onopen = () => {
        this.ws.onmessage = this.onMessage;
        this.ws.send(JSON.stringify({ type: 'verify', data: 'user', id: new Date()}));
        this.ws.send(JSON.stringify({ type: 'users' }));
        this.ws.send(JSON.stringify({ type: 'devices' }));
      };
    },
    onMessage( message ) {
      if( !message || !message.data ) return;
      try {
        message = JSON.parse(message.data);

        switch( message.type ) {
          case 'users':
            this.users = message.data;
            break;
          case 'devices':
            this.devices = message.data;
            break;
          case 'message':
          case 'ack':
          case 'error':
            this.messages.push(message);
            break;
          case 'unverified':
            this.init();
            break;
        }

      } catch( e ) {
        console.log(e);
      }
    },
    sendMessage() {
      if( !this.cur_device ) {
        this.$message('No device select'); return;
      }

      if( !this.new_message ) {
        this.$message('No Message set'); return;
      }

      this.ws.send(JSON.stringify({ type: 'message', data: this.new_message, addr: this.cur_device}));

      this.new_message = '';
      this.$message('Message sent');
    }
  },
  mounted() {
    this.init();
  }
}
</script>

<style>

.list-title {
  font-size: 12px;
  line-height: 45px;
  color: #606266;
  font-weight: bold;
  padding: 0 10px;
  background: #F2F6FC;
}

.list-item {
  font-size: 14px;
  line-height: 45px;
  color: #606266;
  padding: 0 10px;
}

.message-section {
  font-size: 16px;
  line-height: 45px;
  padding: 0 10px;
}

.message-section .message {
  color: #303133;
}

.message-section .ack {
  color: #909399;
}

.message-section .error {
  color: #F56C6C;
}

.footer * {
  border-radius: 0;
}
</style>
