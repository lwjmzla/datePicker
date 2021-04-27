<template>
  <div class="register-page">
    <van-popup v-model="showPicker" round position="bottom">
      <datePicker @cancle="cancleFn" @confirm="clickFn"></datePicker>
    </van-popup>
    
    <!-- <van-popup v-model="showPicker" round position="bottom">
      <lSelect :defaultValue="['上午','随便2']" :list="list" @cancle="cancleFn" @confirm="clickFn"></lSelect>
    </van-popup> -->
    
  </div>
</template>
<script>
  import datePicker from './datePicker.vue';
  import lSelect from './select.vue';
  export default {
    name: 'Register',
    components: {
      datePicker,
      lSelect
    },
    data() {
      return {
        phone: '',
        code: '',
        codeAuthToken: '',
        timeOut: '',
        showDialog: false,
        verifyCode: '',
        codeImg: '',
        identify: '',
        brokerName: this.$route.query.brokerName || '',
        showPicker: true,
        list: [['上午', '下午'], ['随便1', '随便2']]
      };
    },
    computed: {
    },
    created() {
      // console.log(this.$route.query);
    },
    watch: {
      showDialog(val) {
        if (val) {
          this.verifyCode = '';
          this._getCodeImg();
        }
      }
    },
    methods: {
      clickFn(e) {
        console.log(e);
      },
      cancleFn() {
        console.log('取消');
      }
      
    }
  };
</script>
<style lang="scss" scoped>
  .register-page{
    height: 100vh;padding: 0 20px;box-sizing: border-box;padding-top: 30px;position: relative;
  }
  .tips{
    h3{font-size: 24px;color: $color-primary;line-height: 28px;margin-bottom: 10px;}
    p{line-height: 20px;font-size: 16px;color: #999;margin-bottom: 30px;}
  }
  .form{
    border: 1px solid #D8DCE6;border-radius: 10px;
    >div{
      height: 60px;display: flex;align-items: center;
    }
    .phone{
      border-bottom: 1px solid #D8DCE6;
    }
    ::v-deep input[type="text"]{
      font-size: 16px;
    }
    ::v-deep .van-field__left-icon{
      margin-right: 10px;
    }
    .van-cell{
      padding-left: 10px;background: transparent;
    }
  }
  .code-btn{
    width: 90px;height: 36px;text-align: center;line-height: 36px;border-radius: 5px;color: #fff;background: $color-primary;font-size: 14px;
    &.forbid{
      background: #D8DCE6;
    }
  }
  .next-btn{
    height: 45px;line-height: 45px;background: #D8DCE6;color: #fff;font-size: 16px;text-align: center;border-radius: 5px;margin-top:20px;
    &.active{
      background: $color-primary;
    }
  }
  .img-icon{
    height: 16px;position: relative;top: 2px;
  }
  .bottom-tips{
    position: absolute;left: 0;bottom: 20px;width: 100%;height: 20px;line-height: 20px;color: #999;font-size: 16px;text-align: center;
  }
  
  .dialog-contnt{
    padding: 0 15px;
    >div{
      display: flex;
    }
    input[type="text"]{
      font-size: 16px;height: 42px;line-height: 40px;box-sizing: border-box;border: 1px solid #D8DCE6;border-radius: 5px;
      padding-left: 10px;margin-right: 10px;
    }
    img{height: 40px;}
    p{font-size: 12px;color: #999;margin-top: 5px;margin-bottom: 5px;text-align: center;}
    .row{
      display: flex;justify-content: space-between;align-items:center;
      .row-l{
        flex: 1;min-width: 0;
      }
      .row-r{
        width: 110px;
      }
    }
  }
  
</style>
