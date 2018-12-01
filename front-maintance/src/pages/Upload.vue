<template>
  <el-card class="upload-form-card">
    <el-row>

      <el-col :lg="6" :md="12" :xs="24">
        <el-input placeholder="Serial Number" v-model="form.serial_number">
          <i slot="suffix" class="el-input__icon el-icon-circle-plus" @click="startScan('serial_number')"></i>
        </el-input>
      </el-col>

      <el-col :lg="6" :md="12" :xs="24">
        <el-select placeholder="Wire Box" v-model="form.wire_box">
          <el-option label="No Data" :value="null"></el-option>
          <el-option label="Gen 1" value="Gen 1"></el-option>
          <el-option label="Gen 2" value="Gen 2"></el-option>
          <el-option label="Gen 3" value="Gen 3"></el-option>
          <el-option label="8" value="8"></el-option>
          <el-option label="10" value="10"></el-option>
        </el-select>
      </el-col>
      
      <el-col :lg="3" :md="6" :xs="12">
        <el-select placeholder="Unit Model / Rate" v-model="form.unit_model_rate">
          <el-option label="14 K" value="14 K"></el-option>
          <el-option label="20 K" value="20 K"></el-option>
          <el-option label="23 K" value="23 K"></el-option>
          <el-option label="28 K" value="28 K"></el-option>
          <el-option label="36 K" value="36 K"></el-option>
          <el-option label="50 K" value="50 K"></el-option>
          <el-option label="60 K" value="60 K"></el-option>
          <el-option label="100 K" value="100 K"></el-option>
        </el-select>
      </el-col>

      <el-col :lg="3" :md="6" :xs="12">
        <el-select placeholder="Unit Model" v-model="form.unit_model_type">
          <el-option label="SOL" value="SOL"></el-option>
          <el-option label="CPS" value="CPS"></el-option>
          <el-option label="CSI" value="CSI"></el-option>
        </el-select>
      </el-col>

      <el-col :lg="6" :md="12" :xs="24">
        <div class="form-text" style="width:30%; display: inline-block; padding: 10px; border-r"> FIRMWARE DSP </div>
        <el-input v-model="form.old_firmware_dsp" placeholder="OLD" style="width:30%; display: inline-block;">
          <i slot="suffix" class="el-input__icon el-icon-circle-plus" @click="startScan('old_firmware_dsp')"></i>
        </el-input>
        <el-input v-model="form.new_firmware_dsp" placeholder="NEW" style="width:30%; display: inline-block;">
          <i slot="suffix" class="el-input__icon el-icon-circle-plus" @click="startScan('new_firmware_dsp')"></i>
        </el-input>
      </el-col>

      <el-col :lg="6" :md="12" :xs="24">
        <div class="form-text" style="width:30%; display: inline-block; padding: 10px;"> FIRMWARE LCD </div>
        <el-input v-model="form.old_firmware_lcd" placeholder="OLD" style="width:30%; display: inline-block;">
          <i slot="suffix" class="el-input__icon el-icon-circle-plus" @click="startScan('old_firmware_lcd')"></i>
        </el-input>
        <el-input v-model="form.new_firmware_lcd" placeholder="NEW" style="width:30%; display: inline-block;">
          <i slot="suffix" class="el-input__icon el-icon-circle-plus" @click="startScan('new_firmware_lcd')"></i>
        </el-input>
      </el-col>

      <el-col :lg="6" :md="12" :xs="24">
        <div class="form-text" style="width:30%; display: inline-block; padding: 10px;"> FIRMWARE ARC </div>
        <el-input v-model="form.old_firmware_arc" placeholder="OLD" style="width:30%; display: inline-block;">
          <i slot="suffix" class="el-input__icon el-icon-circle-plus" @click="startScan('old_firmware_arc')"></i>
        </el-input>
        <el-input v-model="form.new_firmware_arc" placeholder="NEW" style="width:30%; display: inline-block;">
          <i slot="suffix" class="el-input__icon el-icon-circle-plus" @click="startScan('new_firmware_arc')"></i>
        </el-input>
      </el-col>

      <el-col :lg="3" :md="6" :xs="12">
        <el-input v-model="form.rma" placeholder="RMA"></el-input>
      </el-col>

      <el-col :lg="3" :md="6" :xs="12">
        <el-input v-model="form.data_log" placeholder="DATA LOG"></el-input>
      </el-col>

      <el-col :lg="3" :md="6" :xs="12">
        <el-input v-model="form.count" placeholder="COUNT"></el-input>
      </el-col>

      <el-col :lg="3" :md="6" :xs="12">
        <el-input v-model="form.jira_mt" placeholder="JIRA/MT"></el-input>
      </el-col>

      <el-col :lg="3" :md="6" :xs="12">
        <el-checkbox style="height: 20px; padding: 10px;" true-label="1" false-label="0" v-model="form.fans_running">Fans Running</el-checkbox>
      </el-col>

      <el-col :lg="3" :md="6" :xs="12">
        <el-input v-model="form.fans_inverter_run_time" placeholder="Inverter Run Time (min)"></el-input>
      </el-col>

      <el-col :lg="3" :md="6" :xs="12">
        <el-checkbox style="height: 20px; padding: 10px;" true-label="1" false-label="0" v-model="form.afci_test">AFCI Test</el-checkbox>
      </el-col>

      <el-col :lg="3" :md="6" :xs="12">
        <el-input v-model="form.power_test" placeholder="Testing Power (KW)"></el-input>
      </el-col>

      <el-col :span="24">
        <table class="form-table">
          <thead>
            <tr>
              <th colspan="4"> REPLACEMENT PARTS </th>
            </tr>
            <tr>
              <th style="width: 20%"> ITEM </th>
              <th style="width: 20%"> PART # </th>
              <th style="width: 15%"> IN </th>
              <th style="width: 15%"> OUT </th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(item, idx) in form.parts">
              <tr :key="idx">
                <td rowspan="2"> {{item.part_name}} </td>
                <td rowspan="2"> {{item.part_number}} </td>
                <td> {{item.incoming_type}} </td>
                <td> {{item.outgoing_type}} </td>
              </tr>
              <tr :key="idx">
                <td> {{item.in_sn}} </td>
                <td> {{item.out_sn}} </td>
              </tr>
            </template>

            <tr>
              <td rowspan="2">
                <el-select class="input-no-padding" placeholder="Unit Model" v-model="part.part_name">
                  <el-option v-for="(item, idx) in parts" :key="idx" :label="item.name" :value="item.name"></el-option>
                </el-select>
              </td>
              <td rowspan="2">
                <el-input class="input-no-padding" v-model="part.part_number" placeholder="PART #"></el-input>
              </td>
              <td>
                <el-popover ref="InPopover">
                  <div @click="inChange('NEW')" style="font-size:12px;line-height:25px;padding:0 10px;cursor:pointer;">NEW</div>
                  <div @click="inChange('REBUILD')" style="font-size:12px;line-height:25px;padding:0 10px;cursor:pointer;">REBUILD</div>
                </el-popover>
                <el-input class="input-no-padding" v-model="part.incoming_type" placeholder="IN" v-popover:InPopover></el-input>
              </td>
              <td>
                <el-popover ref="OutPopover">
                  <div @click="outChange('NEW')" style="font-size:12px;line-height:25px;padding:0 10px;cursor:pointer;">NEW</div>
                  <div @click="outChange('REBUILD')" style="font-size:12px;line-height:25px;padding:0 10px;cursor:pointer;">REBUILD</div>
                </el-popover>
                <el-input class="input-no-padding" v-model="part.outgoing_type" placeholder="OUT" v-popover:OutPopover></el-input>
              </td>
            </tr>

            <tr>
              <td>
                <el-input class="input-no-padding" v-model="part.in_sn" placeholder="IN SN"></el-input>
              </td>
              <td>
                <el-input class="input-no-padding" v-model="part.out_sn" placeholder="OUT SN"></el-input>
              </td>
            </tr>

            <tr>
              <td colspan="4">
                <el-button size="mini" type="text" style="width: 100%;" @click="addPart"> ADD </el-button>
              </td>
            </tr>
          </tbody>
        </table>
      </el-col>

      <el-col :span="24">
        <el-input type="textarea" :rows="5" placeholder="Repaire / Analysis" v-model="form.repair_analysis"></el-input>
      </el-col>

      <el-col :span="24">
        <div style="position: relative; min-height:115px;">

          <div v-for="i in 8" :key="i" style="display: inline-block;">
            <img v-if="form['picture' + i]" :src="form['picture' + i]" 
              style="margin: 9px; border:1px solid #EEE; height: 95px; width: 95px;">
          </div>

          <div style="position: absolute; left: 15px; top: 10px; font-size: 14px; color: #C0C4CC;">
            Pictures
          </div>

          <el-button style="position: absolute; right: 5px; bottom: 5px;" circle type="success">
            <label for="file-input"> <i class="el-icon-picture"></i> </label>
            <input class="inputfile" type="file" id="file-input" ref="file-input" v-on:change="imageUploaded()">
          </el-button>
        </div>
      </el-col>

      <el-col :lg="12" :xs="24">
        <div class="form-text" style="height: 30px; padding: 5px 10px; line-height: 30px;"> {{form.date}} BY {{user.email}} </div>
      </el-col>

      <el-col :lg="12" :xs="24" style="text-align: right; padding: 5px 10px;">
        <el-button size="mini" type="success" style="height: 30px;" @click="uploadForm"> Confirm </el-button>
      </el-col>

      <barcode-scanner @on-confirm="onScanConfirm" ref="BarcodeScanner"></barcode-scanner>
    </el-row>
  </el-card>
</template>

<script>
import { getParts, uploadImage, createForm } from '@/api/form';
import BarcodeScanner from '@/components/BarcodeScanner';

export default {
  components: {
    BarcodeScanner
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  data() {
    return {
      parts: [],
      part: {
        part_name: '',
        part_number: '',
        incoming_type: '',
        outgoing_type: ''
      },

      scan_keyL : '',

      form: {
        user_id: '',
        serial_number: '',
        wire_box: '',
        unit_model_rate: '',
        unit_model_type: '',
        old_firmware_dsp: '',
        old_firmware_lcd: '',
        old_firmware_arc: '',
        new_firmware_dsp: '',
        new_firmware_lcd: '',
        new_firmware_arc: '',
        date: '',
        rma: '',
        data_log: '',
        count: '',
        jira_mt: '',
        picture1: '',
        picture2: '',
        picture3: '',
        picture4: '',
        picture5: '',
        picture6: '',
        picture7: '',
        picture8: '',
        repair_analysis: '',
        fans_running: '',
        fans_inverter_run_time: '',
        power_test: '',
        afci_test: '',
        parts: []
      }
    }
  },
  methods: {
    inChange(val) {
      this.$refs.InPopover.doClose();
      this.part.incoming_type = val;
    },
    outChange(val) {
      this.$refs.OutPopover.doClose();
      this.part.outgoing_type = val;
    },
    startScan(scan_key) {
      this.scan_key = scan_key;
      this.$refs.BarcodeScanner.show();
    },
    onScanConfirm(code) {
      if( !this.scan_key ) return;
      this.form[this.scan_key] = code;
    },
    addPart() {
      if( !this.part.part_name ) {
        this.$message('ITEM NAME needed'); return;
      }

      if( !this.part.part_number ) {
        this.$message('PART # needed'); return;
      }

      if( !this.part.incoming_type ) {
        this.$message('INCOMING needed'); return;
      }

      if( !this.part.outgoing_type ) {
        this.$message('OUTGOING needed'); return;
      }
      this.form.parts.push( JSON.parse( JSON.stringify( this.part ) ) );
      this.part = { part_name: '', part_number: '', incoming_type: '', outgoing_type: '' };
    },
    uploadForm() {
      if( !this.form.serial_number ) {
        this.$message('Serial Number needed'); return;
      }

      if( !this.form.unit_model_rate ) {
        this.$message('Unit Model (Rate) needed'); return;
      }

      if( !this.form.unit_model_type ) {
        this.$message('Unit Model needed'); return;
      }

      let form = JSON.parse( JSON.stringify( this.form ) );

      form.parts.forEach(part => {
        part.incoming_type += ' (' + part.in_sn + ')';
        part.outgoing_type += ' (' + part.out_sn + ')';
        delete part.in_sn;
        delete part.out_sn;
      });

      createForm(form).then(res => {
        this.$message('Uploaded');
        setTimeout(() => { window.location.reload(); }, 300)
      }, err => {
        this.$message( err.response.data );
      });
    },
    imageUploaded(ref) {
      let full = true;
      for( let i = 1; i <= 8 && full; i++ ) {
        if( !this.form['picture' + i] ) {
          full = false;
        }
      }
      if( full ) {
        this.$message('At most 8 pictures.');
        return;
      }
      let file = this.$refs['file-input'].files[0];
      uploadImage(file).then(res => {
        this.$message('File Uploaded');
        if( res.data.path ) {
          for( let i = 1; i <= 8; i++ ) {
            if( !this.form['picture' + i] ) {
              this.form['picture' + i] = res.data.path;
              const input = this.$refs['file-input'];
              input.type = 'text';
              input.type = 'file';
              return;
            }
          }
        }
      }, err => {
        this.$message( err.response.data );

        const input = this.$refs['file-input'];
        input.type = 'text';
        input.type = 'file';
      });
    }
  },
  mounted() {
    this.form.date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    getParts().then(res => {
      this.parts = res.data;
    }, err => {
      this.$message( err.response.data );
    })
  },
  watch:{
    '$store.getters.user': function(val) {
      this.form.user_id = this.user.id;
    }
  }
}
</script>

<style>
.upload-form-card {
  margin-top: 10px;
}

.upload-form-card .el-card__body{
  padding: 0;
}

.upload-form-card .el-col {
  border: 1px solid #E4E7ED;
}

.upload-form-card .inputfile {
	width: 0;
	height: 0;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -1;
}

.upload-form-card .el-select {
  width: 100%;
}

.upload-form-card .el-input__inner {
  border: none;
}

.upload-form-card .el-textarea__inner {
  border: none;
}

.upload-form-card .form-image {
  max-width: 100%;
  max-height: 100%;
}

.upload-form-card .form-text {
  font-size: 12px;
  color: #606266;
}

.upload-form-card .form-table {
  font-size: 12px;
  line-height: 17px;
  width: 100%;
  overflow: scroll;
  border-collapse: collapse;
}

.upload-form-card .form-table th {
  font-weight: 400;
}

.upload-form-card .form-table th, .upload-form-card .form-table td{ 
  font-size: 12px;
  line-height: 40px;
  padding: 0 10px; 
  word-break: keep-all; 
  white-space:nowrap; 
  border: 1px solid #ddd; color: #606266; 
}

.upload-form-card .form-table tr:last-child td {
  border-bottom: 0;
}
.upload-form-card .form-table tr td:first-child, .upload-form-card .form-table tr th:first-child {
  border-left: 0;
}
.upload-form-card .form-table tr td:last-child, .upload-form-card .form-table tr th:last-child {
  border-right: 0;
}

.input-no-padding .el-input__inner{
  padding: 0 !important;
}
</style>
