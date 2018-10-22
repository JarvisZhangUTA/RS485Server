<template>
  <el-dialog title="Pictures" :visible.sync="visible">
    <div v-if="form.picture1" class="dialog-picture-container">
      <img :src="form.picture1" class="dialog-picture">
    </div>
    <div v-if="form.picture2" class="dialog-picture-container">
      <img :src="form.picture2" class="dialog-picture">
    </div>
    <div v-if="form.picture3" class="dialog-picture-container">
      <img :src="form.picture3" class="dialog-picture">
    </div>
    <div v-if="form.picture4" class="dialog-picture-container">
      <img :src="form.picture4" class="dialog-picture">
    </div>
    <div v-if="form.picture5" class="dialog-picture-container">
      <img :src="form.picture5" class="dialog-picture">
    </div>
    <div v-if="form.picture6" class="dialog-picture-container">
      <img :src="form.picture6" class="dialog-picture">
    </div>
    <div v-if="form.picture7" class="dialog-picture-container">
      <img :src="form.picture7" class="dialog-picture">
    </div>
    <div v-if="form.picture8" class="dialog-picture-container">
      <img :src="form.picture8" class="dialog-picture">
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      form: {}
    }
  },
  methods: {
    show(form) {
      this.form = form;
      this.visible = true;
    }
  }
}
</script>

<style>
.dialog-picture-container {
  vertical-align: top;
  display: inline-block;
  width: 300px;
  height: 300px;
  padding: 10px;
  border: 1px solid #E4E7ED;
  margin: 5px;
}

.dialog-picture {
  max-width: 100%;
  max-height: 100%;
}
</style>
