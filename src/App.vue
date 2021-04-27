<template>
  <div id="app">
    <router-view/>
    <van-popup :close-on-click-overlay="false"
      :overlay="false"
      v-model="$store.state.isLoading"
    >
      <div class="xs-loading">
        <van-loading type="spinner"
          color="#fff"
        />
      </div>
    </van-popup>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      };
    },
    components: {
    }
  };
</script>

<style lang="scss">
  body{
    padding: 0;margin: 0;
  }
  ul,h1,h2,h3,h4,h5{padding: 0;margin: 0;}
  div, p, li, span {
    font-size: 12px;
  }
  a{text-decoration: none;}

  .van-popup {
    background-color: transparent;
  }

  .xs-loading {
    width: 60px;
    height: 60px;
    background: #333;
    text-align: center;
    line-height: 60px;
    border-radius: 4px;
  }
  input::-webkit-input-placeholder {        /* WebKit, Blink, Edge */
      /* placeholder颜色  */
      color: #CFD5E9!important;
      /* placeholder字体大小  */
        /*font-size: 12px;*/
      /* placeholder位置  */
      /*text-align: right;*/
  }
  input:-moz-placeholder{color: #CFD5E9!important;}    /* Mozilla Firefox 4 to 18 */
  input::-moz-placeholder{color: #CFD5E9!important;}    /* Mozilla Firefox 19+ */
  input:-ms-input-placeholder{color: #CFD5E9!important;}  /* Internet Explorer 10-11 */
</style>
