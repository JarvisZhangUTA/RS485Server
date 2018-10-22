<template>
  <div>

    <table class="normal-table">
      <thead>
        <tr>
          <th rowspan="3"> Date </th>
          <th rowspan="3"> Repaired By </th>
          <th rowspan="3"> SERIAL NUMBER </th>
          <th rowspan="3"> UNIT MODEL </th>
          <th colspan="6"> FIRMWARE </th>
          <th colspan="3" rowspan="2"> OFFICE USE </th>
          <th rowspan="3"> Fans Running </th>
          <th rowspan="3"> Inverter Run Time </th>
          <th rowspan="3"> Test Power </th>
          <th rowspan="3"> AFCI Test </th>
          <th rowspan="3"> IN/OUT parts </th>
          <th rowspan="3"> Pictures </th>
        </tr>

        <tr>
          <!-- FIRMWARE -->
          <th colspan="2"> DSP </th>
          <th colspan="2"> LCD </th>
          <th colspan="2"> ARC </th>

        </tr>

        <tr>
          <!-- FIRMWARE -->
          <th> OLD </th>
          <th> NEW </th>

          <th> OLD </th>
          <th> NEW </th>

          <th> OLD </th>
          <th> NEW </th>

          <!-- OFFICE USE -->
          <th> DATA Log </th>
          <th> Count </th>
          <th> JIRA/MT </th>
        </tr>
      </thead>

      <tbody>
        <template v-for="item in forms">
          <tr :key="'form_' + item.id">
            <td> {{formatDate(item.date)}} </td>
            <td> {{item.user.email}} </td>
            <td> {{item.serial_number}} </td>
            <td> {{item.unit_model_rate}} {{item.unit_model_type}} </td>

            <td> {{item.old_firmware_dsp}} </td>
            <td> {{item.new_firmware_dsp}} </td>

            <td> {{item.old_firmware_lcd}} </td>
            <td> {{item.new_firmware_lcd}} </td>

            <td> {{item.old_firmware_arc}} </td>
            <td> {{item.new_firmware_arc}} </td>

            <td> {{item.data_log}} </td>
            <td> {{item.count}} </td>
            <td> {{item.jira_mt}} </td>

            <td> {{item.fans_running}} </td>
            <td> {{item.fans_inverter_run_time}} </td>

            <td> {{item.power_test}} </td>
            <td> {{item.afci_test}} </td>

            <td> {{item.parts.length}} PARTS <i class="el-icon-more table-item-icon" @click="showParts(item)"></i> </td>

            <td> {{pictureCount(item)}} PICS <i class="el-icon-picture table-item-icon" @click="showPictures(item)"></i> </td>
          </tr>
        </template>
      </tbody>
    </table>

    <div style="margin: 5px 0;">
      <el-pagination
        style="float: left;"
        @size-change="perPageChange"
        @current-change="pageChange"
        :current-page="page"
        :page-sizes="[20, 40, 80, 100]"
        :page-size="per_page"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>

      <el-button style="float: right;" size="mini" type="success" @click="exportTable"> Export </el-button>
    </div>

    <parts-dialog ref="PartsDialog"></parts-dialog>
    <picture-dialog ref="PictureDialog"></picture-dialog>
  </div>
</template>

<script>
import { getForms } from '@/api/form';
import XLSX from 'xlsx';

import PictureDialog from '@/components/PictureDialog';
import PartsDialog from '@/components/PartsDialog';

export default {
  components: {
    PartsDialog,
    PictureDialog
  },
  data() {
    return {
      loading: false,
      page: 1,
      per_page: 40,
      total: 0,
      forms: []
    }
  },
  methods: {
    pageChange(page) {
      this.page = page;
      this.getData();
    },
    perPageChange(per_page) {
      this.per_page = per_page;
      this.getData();
    },
    getData() {
      this.loading = true;
      getForms({
        page: this.page,
        per_page: this.per_page
      }).then(res => {
        this.loading = false;
        this.forms = res.data.data;
        this.total = res.data.total;
      }, err => {
        this.loading = false;
        this.$message( err.response.data );
      })
    },
    pictureCount(form) {
      let count = 0;
      if(form.picture1) count++;
      if(form.picture2) count++;
      if(form.picture3) count++;
      if(form.picture4) count++;
      if(form.picture5) count++;
      if(form.picture6) count++;
      if(form.picture7) count++;
      if(form.picture8) count++;
      return count;
    },
    formatDate(date) {
      return date.substr(0, 10) + ' ' + date.substr(11, 8);
    },
    showPictures(form) {
      if( this.pictureCount(form) == 0 ) {
        this.$message('No Pictures'); return;
      }
      this.$refs.PictureDialog.show(form);
    },
    showParts(form) {
      if( form.parts.length === 0 ) {
        this.$message('No Parts'); return;
      }
      this.$refs.PartsDialog.show(form);
    },
    exportTable() {
      let export_form = JSON.parse( JSON.stringify( this.forms ) );

      export_form.forEach(item => {
        item.email = item.user.email;
        delete item.user;

        item.parts = JSON.stringify( item.parts );

        Object.keys(item).forEach(key => {
          item[key] = item[key] + '';
        });
      });

      let ws = XLSX.utils.json_to_sheet(export_form) 
      let wb = XLSX.utils.book_new() 
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1') 
      XLSX.writeFile(wb, new Date().toISOString() + '.xlsx')
    }
  },
  mounted() {
    this.getData();
  }
}
</script>

<style>
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
</style>
