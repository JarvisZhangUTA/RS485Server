<template>
  
</template>

<script>
import { removeToken } from '@/utils/auth';

export default {
  mounted() {
    removeToken();
    this.$router.push('/login');
  }
}
</script>
