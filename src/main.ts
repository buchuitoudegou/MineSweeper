import 'ant-design-vue/dist/antd.css';
import 'element-ui/lib/theme-chalk/index.css';

import Antd from 'ant-design-vue';
import App from './App.vue';
import ElementUI from 'element-ui';
import Vue from 'vue';
import router from './router';
import store from './store';

Vue.use(Antd);
Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
