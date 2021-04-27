# 一个基于vue的移动端时间选择器datePicker和select

## props
```
props: {
  defaultTime: { // !eg [2021, 1, 23]
    type: Array,
    default: () => []
  },
  // 年份开始时间
  startYear: {
    type: [String, Number],
    default: 1950
  },
  // 年份结束时间
  endYear: {
    type: [String, Number],
    default: 2050
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
}
```

## events
```
@cancle="cancleFn"
@confirm="clickFn"
```