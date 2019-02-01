import 'ant-design-vue/dist/antd.css';

import Antd from 'ant-design-vue';
import App from './App.vue';
import Vue from 'vue';
import router from './router';
import store from './store';

Vue.use(Antd);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
