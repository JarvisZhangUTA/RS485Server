<template>
  <el-dialog title="Barcode Scanner" :visible.sync="visible" :before-close="hide" :fullscreen="true">
    <div id="bar-code-scanner">
      <div class="bar-code" @click="confirm">
        <span v-if="code"> {{code}} (Click to confirm) </span>
        <span v-else> Scanning </span>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import Quagga from 'quagga';

export default {
  data() {
    return {
      visible: false,
      code: ''
    }
  },
  methods: {
    show() {
      this.visible = true;
      this.$nextTick(() => { this.start(); });
    },
    hide(done) {
      this.stop();
      done();
    },
    start() {
      Quagga.init({
        locate: true,
        locator: {
          patchSize: 'medium',
          halfSample: true
        },

        numOfWorkers: 4,
        frequency: 20,

        inputStream : {
          name : "Live",
          type : "LiveStream",
          constraints: {
            width: 300,
            height: 100,
            facingMode: "environment"
          },
          area: { // defines rectangle of the detection/localization area
            top: "0%",    // top offset
            right: "0%",  // right offset
            left: "0%",   // left offset
            bottom: "0%"  // bottom offset
          },
          target: document.querySelector('#bar-code-scanner')
        },
        decoder : {
          readers : ['code_128_reader']
        }
      }, (err) => {
          if (err) {
            console.log(err);
            return;
          }
          console.log("Initialization finished. Ready to start");
          Quagga.start();
          Quagga.onDetected(this.onDetected)
      });
    },
    stop() {
      Quagga.stop();
    },
    onDetected(data) {
      if( !data ) return;
      console.log(data);
      this.code = data.codeResult.code;
    },
    confirm() {
      console.log('on-fonfirm');

      this.$emit('on-confirm', this.code);
      this.stop();

      this.visible = false;
      this.code = '';
    }
  }
}
</script>

<style>
  #bar-code-scanner {
    width: auto;
    height: auto;
    position: relative;
    text-align: center;
  }

  .bar-code {
    z-index: 999;

    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    background: #FFF;
    opacity:0.4;

    font-size: 16px;
    font-weight: bold;
    line-height: 40px; 
    color: 606266; 
    text-align: center; 
    padding: 10px; 
    cursor: pointer;
  }

  .drawingBuffer {
    position: absolute;
    left: 0;
    top: 0;
  }
</style>
