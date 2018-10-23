<template>
  <el-dialog title="IN/OUT Parts" :visible.sync="visible">
    <table class="normal-table">
      <thead>
        <tr>
          <th> Name </th>
          <th> Part # </th>
          <th> IN </th>
          <th> OUT </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in form.parts" :key="item.id">
          <td data-column="Part"> {{item.part_name}} </td>
          <td data-column="Part #"> {{item.part_number}} </td>
          <td data-column="IN"> {{item.incoming_type}} </td>
          <td data-column="OUT"> {{item.outgoing_type}} </td>
        </tr>
      </tbody>
    </table>
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
