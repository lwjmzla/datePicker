<template>
  <div class="container" :style="styl">
    <div class="Btn">
      <div class="cancleBtn" :style="{'color': `${cancelColor}`}" @click="btcancle">{{ cancelText }}</div>
      <div class="title">{{ title }}</div>
      <div class="sureBtn" :style="{'color': `${confirmColor}`}" @click="btsure">{{ confirmText }}</div>
    </div>
    <div class="all">
      <div v-for="(item, i) in arrSelf" :key="i" @touchstart.stop="tstart(i,$event)" @touchmove.stop.prevent="tmove(i,$event)" @touchend.stop="tend(i,$event)">
        <ul :style="{'transform': `translateY(${distanceArr[i] && distanceArr[i].distance}px)`}">
          <li v-for="(subItem, i2) in item" :key="i2" 
            :style="{'color': `${Math.abs(i2 - 3 + distanceArr[i].distance / itemHeight) === 0 ? '#ff5722' : ''}`,'user-select':'none'}"
          >
            {{ subItem }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Time',
    props: {
      defaultValue: {
        type: Array,
        default: () => []
      },
      list: { // !eg [['上午', '下午'], ['随便1', '随便2']]
        type: Array,
        default: () => []
      },
      title: {
        type: String,
        default: ''
      },
      confirmText: {
        type: String,
        default: '确定'
      },
      cancelText: {
        type: String,
        default: '取消'
      },
      confirmColor: {
        type: String,
        default: 'red'
      },
      cancelColor: {
        type: String,
        default: 'black'
      },
      styl: {
        type: Object,
        default: () => {}
      }
    },
    data() {
      return {
        sizeUIWidth: 375,
        itemHeight: 40,
        distanceArr: [],
        arrSelf: [],
        valueSelf: [],
        valueArr: [],
        years: [],
        year: 0,
        months: [],
        month: 0,
        days: [],
        day: 0,
        distanceBeforeStart: 0
      };
    },
    mounted() {
      // !----------------我引用了 px转vw插件，所以需要下面这2行，没用插件的可以删除下面2行的，固定itemHeight为40
      let screenWidth = window.screen.availWidth || document.documentElement.clientWidth;
      this.itemHeight = this.itemHeight * screenWidth / this.sizeUIWidth;
      // !----------------
      this.initArr();
      this.initDistance();
    },
    methods: {
      tstart(i, ev) {
        this.distanceArr[i].ystart = ev.touches[0].screenY;
        this.distanceBeforeStart = this.distanceArr[i].distance; // !原来的偏移量
      },
      tmove(i, ev) {
        let y = ev.touches[0].screenY;
        let { maxy, miny, ystart } = this.distanceArr[i];
        // maxy // !最下面的值的translateY值  例如月的ul transform: translateY(-320px);
        // miny// !最上面的值的translateY值  例如月的ul transform: translateY(120px);
        // let distance = y - ystart + this.distanceArr[i].distance; // !这里不能直接用this.distanceArr[i].distance，因为这个值在当前函数不断变动!!!
        let distance = y - ystart + this.distanceBeforeStart; // !y - ystart相当于deltaY
        if (distance > miny) distance = miny;
        if (distance < maxy) distance = maxy;
        this.distanceArr[i].distance = distance; // !移动结束值，但会在tend执行，四舍五入得到最终值
        this.$forceUpdate();
      },
      tend(i, ev) {
        if (ev.touches.length === 0 && ev.changedTouches.length === 1) {
          // !比如从1月滑到2月 正常来说是  this.distanceArr[i].distance  从120变80，但四舍五入 大于100 还是属于120  小于100 属于 80变2月
          let distance = Math.round(this.distanceArr[i].distance / this.itemHeight) * this.itemHeight; // !最终值
          // console.log(distance); // !120
          // console.log(this.distanceArr[i].distance); // !106
          let distanceDif = this.distanceArr[i].distance - distance; // !-14 计算当前值和最终值的偏移量
          let distanceDif10 = distanceDif / 10; // !-1.4
          // console.log(distanceDif, distanceDif10);
          for (let i2 = 0; i2 < 10; i2++) { // !分成10段来偏移，这是执行运动轨迹,动效的代码
            setTimeout(() => {
              if (i2 === 9) { // ! 前9项都是执行运动，这个是到达目的值了
                this.distanceArr[i].distance = distance;
              } else {
                this.distanceArr[i].distance -= distanceDif10;
              }
              this.$forceUpdate();
            }, 17 * i2);
          }
        }
        // this.valueArr = this.arrSelf.map((v, i) => {
        //   let i2 = -this.distanceArr[i].distance / this.itemHeight + 3;
        //   return this.arrSelf[i][i2];
        // });
      },
      btcancle() {
        this.$emit('cancle');
      },
      btsure() {
        this.$emit('confirm', this.getValueArr());
      },
      getValueArr() {
        let arr = this.arrSelf.map((v, i) => {
          let i2 = -this.distanceArr[i].distance / this.itemHeight + 3;
          return this.arrSelf[i][i2];
        });
        this.valueSelf = arr;
        return arr;
      },
      initArr() {
        this.valueSelf = this.defaultValue;
        this.arrSelf = this.list;
        // console.log(this.arrSelf)
        this.$forceUpdate();
      },
      // 生成递进的数组
      generateArray(start, end) {
        // 转为数值格式，否则用户给end-year等传递字符串值时，下面的end+1会导致字符串拼接，而不是相加
        start = Number(start);
        end = Number(end);
        end = end > start ? end : start;
        // 生成数组，获取其中的索引，并剪出来
        return [...Array(end + 1).keys()].slice(start);
      },
      setYears() {
        // 获取年份集合
        this.years = this.generateArray(this.startYear, this.endYear);
      },
      setMonths() {
        this.months = this.generateArray(1, 12);
      },
      setDays() {
        let totalDays = new Date(this.year, this.month, 0).getDate(); // !得到这个月总天数
        this.days = this.generateArray(1, totalDays);
      },
      initDistance() { // 如果没找到对应值的位置，就用数组最后一项
        console.log(this.arrSelf);
        this.arrSelf.forEach((v, i) => {
          let valIndex = this.arrSelf[i].findIndex(item => item === this.valueSelf[i]); // !arrSelf 里的子数组 跟valueSelf[i]值 相同的
          // console.log(valIndex); // !71 3 22
          let distance;
          if (valIndex !== -1) { // !找到值
            distance = -(valIndex - 3) * this.itemHeight;
          } else { // ! 比如30号，月份切换到2月，找不到30号的值就执行这里
            valIndex = this.arrSelf[i].length - 1;
            distance = -(valIndex - 3) * this.itemHeight;
          }
          this.distanceArr[i] = {
            distance,
            maxy: -(this.arrSelf[i].length - 4) * this.itemHeight, // !最下面的值的translateY值  例如月的ul transform: translateY(-320px);
            miny: 3 * this.itemHeight // !最上面的值的translateY值  例如月的ul transform: translateY(120px);
          };
        });
        this.$forceUpdate();
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.container {
  background-color: #fff;
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
}
ul, li {
  list-style: none ;
  margin: 0;
}
.all {
  display: flex;
  width: 100%;
  height: 280px;
  overflow: hidden;
  >div {
    flex: 1;
    position: relative;
    left: 0;
    top: 0;
    &:before {
      position: absolute;
      left: 0;
      top: 0;
      content: '';
      width: 100%;
      height: calc(50% - 20px);
      background: linear-gradient(rgba(200, 200, 200, .1), rgba(0, 0, 0, 0));
      border-bottom: 1px solid #ccc;
    }
    &:after {
      position: absolute;
      left: 0;
      bottom: 0;
      content: '';
      width: 100%;
      height: calc(50% - 20px);
      background: linear-gradient(rgba(0, 0, 0, 0), rgba(200, 200, 200, .1));
      border-top: 1px solid #ccc;
    }
    >ul {
      // perspective 4000
      padding: 0;
      transform-origin: center;
      >li {
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
      }
    }
  }
}
.Btn {
  height: 45px;
  line-height: 45px;
  color: #666666;
  font-size: 15px;
  background-color: #fef2ee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  .cancleBtn,.sureBtn {
    padding: 0 20px;font-size: 14px;
    user-select: none;
  }
  .title{
    font-size: 14px;
  } 
}
</style>
