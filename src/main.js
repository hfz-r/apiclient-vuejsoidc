/* eslint-disable */
import Vue from 'vue';
import VueRouter from 'vue-router';
import router from './router';
import store from './store';
import App from './App';

import './sass/app.scss'

Vue.use(VueRouter);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth) {
    store.dispatch('fetchRole').then(
      sucess => {
        if (to.meta.role == sucess) {
          next();
        } else {
          next('/accessdenied');
        }
      },
      err => {
        console.log(err);
      }
    );
  } else {
    next();
  }
});
