<template>
  <div>
    
  </div>
</template>

<script>
import { login } from '@/api/user';

export default {
  data() {
    return {
      ws: null
    }
  },
  methods: {
    init() {
      this.ws = new WebSocket('ws://206.189.166.192:8080');

      this.ws.onopen = () => {
        this.ws.onmessage = this.onMessage;
        this.ws.send(JSON.stringify({ type: 'verify', data: 'user'}));
        this.ws.send(JSON.stringify({ type: 'users' }));
        this.ws.send(JSON.stringify({ type: 'devices' }));
      };
    },
    onMessage( message ) {
      console.log('on message');
      console.log( message );
    }
  },
  mounted() {
    this.init();
  }
}
</script>

<style>

</style>
