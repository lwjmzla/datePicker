import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/styles/normalize.css';
import '@/styles/common.scss';
import VConsole from 'vconsole';
// 按需引入vant组件
import {
  Tag,
  Area,
  Switch,
  Dialog,
  Checkbox,
  IndexBar,
  IndexAnchor,
  Tab,
  Tabs,
  Collapse,
  CollapseItem,
  Sticky,
  Cell,
  CellGroup,
  Button,
  Field,
  Toast,
  NavBar,
  Icon,
  ActionSheet,
  Radio,
  RadioGroup,
  List,
  Popup,
  Loading,
  PullRefresh,
  Swipe,
  SwipeItem,
  Tabbar,
  TabbarItem,
  Lazyload,
  Uploader,
  Overlay,
  Picker,
  ImagePreview
} from 'vant';
if (process.env.VUE_APP_BUILD_ENV === 'test') {
  var vConsole = new VConsole();
}

Vue.use(Cell)
  .use(Tag)
  .use(Area)
  .use(Switch)
  .use(Dialog)
  .use(Checkbox)
  .use(IndexBar)
  .use(IndexAnchor)
  .use(Tab)
  .use(Tabs)
  .use(Collapse)
  .use(CollapseItem)
  .use(Sticky)
  .use(CellGroup)
  .use(Button)
  .use(Field)
  .use(Toast)
  .use(NavBar)
  .use(Icon)
  .use(ActionSheet)
  .use(Radio)
  .use(RadioGroup)
  .use(List)
  .use(Popup)
  .use(Loading)
  .use(PullRefresh)
  .use(Swipe)
  .use(SwipeItem)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Uploader)
  .use(Overlay)
  .use(Picker)
  .use(Lazyload);

Vue.config.productionTip = false; ;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

// new Vue({
//   el: '#app',
//   router,
//   store,
//   template: '<App/>',
//   components: { App }
// });
