import MineSweeper from './views/MineSweeper.vue';
import Router from 'vue-router';
import Vue from 'vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'mine-sweeper',
      component: MineSweeper
    }
  ]
});
