<template>
  <div>
    <div style="margin-top: 10px;">
      <el-pagination background layout="sizes, prev, pager, next, total"
        :current-page="page" :page-size="per_page" :total="total"
        :page-sizes="[20, 40, 100, 200]"
        @current-change="pageChange" @size-change="perPageChange"
      >
      </el-pagination>
    </div>
    
    <div style="margin: 10px;">
      <table class="normal-table">
        <thead>
          <tr>
            <th v-for="field in fields" :key="field"> {{field}} </th>
            <th style="text-align: center;">
              <el-popover placement="bottom-end" popper-class="fields-popover">
                <div class="field-title"> Selected </div>
                <draggable v-model="fields">
                  <div v-for="field in fields" :key="field" class="field-item" @click="selectField(field)"> 
                    <fa-icon icon="align-justify"></fa-icon> {{field}}
                  </div>
                </draggable>
                <div class="field-title"> All Field </div>
                <template v-for="field in all_fields">
                  <div v-if="fields.indexOf(field) == -1" :key="field" class="field-item" @click="selectField(field)">
                    <fa-icon icon="square"></fa-icon> {{field}}
                  </div>
                </template>
                <i slot="reference" class="el-icon-more" style="cursor: pointer;"></i>
              </el-popover>
            </th>
          </tr>
        </thead>

        <tbody v-for="command in commands" :key="command._id">
          <tr>
            <td v-for="field in fields" :key="field">
              {{command[field]}}
            </td>
            <td>
              <el-button @click="selectCommand(command)" size="mini" type="text"> More </el-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>


    <el-dialog :visible.sync="visible" custom-class="command-detail-card">
      <div class="command" v-html="jsonPretty(command)"></div>
    </el-dialog>
  </div>
</template>

<script>
import { getCommands } from '@/api/command';

import Pretty from 'json-pretty-html';
import DateHelper from '@/classes/DateHelper';
import draggable from 'vuedraggable';

export default {
  components: {
    draggable
  },
  data() {
    return {
      visible: false,
      loading: false,
      total: 0,
      page: 1,
      per_page: 40,
      commands: [],

      all_fields: [],
      fields: ['date', 'device_address', 'model', 'sn', 'eff', 'pf', 'pmax', 'run_time', 'pac', 'sac']
    }
  },
  methods: {
    pageChange(page) {
      this.page = page;
      this.getCommands();
    },
    perPageChange(per_page) {
      this.page = 1;
      this.per_page = per_page;
      this.getCommands();
    },
    formatDate(date) {
      return DateHelper.date2strYMDHMS(date);
    },
    jsonPretty( json ) {
      return Pretty( json );
    },
    getCommands() {
      this.loading = true;
      getCommands({
        page: this.page, per_page: this.per_page
      }).then(res => {
        this.loading = false;
        this.total = res.data.total;
        this.commands = res.data.data;

        if( res.data.data.length > 0 ) { this.all_fields = Object.keys( res.data.data[0] ); }
      }, err => {
        this.loading = false;
      });
    },
    selectCommand( command ) {
      this.command = command;
      this.visible = true;
    },
    selectField(field) {
      let index = this.fields.indexOf( field );
      if( index === -1 ) {
        this.fields.push( field );
      } else {
        this.fields.splice( index, 1 );
      }
    }
  },
  mounted() {
    this.getCommands();
  }
}
</script>

<style>
.command {
  background: #303133;
  color: #FFF;
  word-break: break-all;
  font-size: 14px;
  line-height: 25px;
  max-height: 400px;
  overflow-y: auto;
}

.json-key {
  color: #F56C6C;
}

.json-string {
  color: #409EFF;
}

.json-number {
  color: #67C23A;
}

.selected {
  background: #EEE !important;
}

.command-detail-card {
  margin: 5px;
  background: #303133 !important;
}

.fields-popover {
  max-height: 400px;
  overflow-y: auto;
  overflow-x: hidden;
}

.field-title {
  color: #409EFF;
  border-bottom: 1px solid #E4E7ED;
  font-size: 13px;
  line-height: 25px;
  font-weight: bold;
  cursor: pointer;
}

.field-item {
  font-size: 13px;
  line-height: 25px;
  cursor: pointer;
}
</style>
