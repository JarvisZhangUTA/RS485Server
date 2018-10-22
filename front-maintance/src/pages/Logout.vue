<template>
  
</template>

<script>
import { removeToken } from '@/utils/auth';

export default {
  mounted() {
    removeToken();
    window.location.href="/login";
  }
}
</script>
