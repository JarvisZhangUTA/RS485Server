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

<style scoped>
.normal-table {
  font-size: 12px;
  line-height: 25px;
  width: 100%;
  overflow: scroll;
  border-collapse: collapse;
}

.normal-table thead > tr > th{ padding: 0 5px; font-size:13px; background: #757575; color: white; border: 1px solid #ddd;}
.normal-table tbody > tr > td{ padding: 0 5px; word-break: keep-all; white-space:nowrap; border: 1px solid #ddd; color: #606266;}
.normal-table tbody > tr:hover { background:#F2F6FC; }


.table-item-icon {
  float: right;
  line-height: 25px !important;
}


@media only screen and (max-width: 700px)  {
	.normal-table { 
    width: 100%; 
    display: block; 
	}

  .normal-table thead, tbody, th, td, tr { 
    display: block; 
  }

  .normal-table thead tr { 
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  .normal-table tr { 
    border: 1px solid #ccc; 
  }

  .normal-table td { 
    border: none !important;
    border-bottom: 1px solid #eee !important; 
    position: relative;
    padding-left: 45% !important; 
    min-height: 20px;
  }

  .normal-table td:before { 
    position: absolute;
    left: 3px;
    width: 40%; 
    padding-right: 10px; 
    white-space: nowrap;
    text-align: left !important;
    content: attr(data-column);

    color: #000;
    font-weight: bold;
  }
}
</style>

