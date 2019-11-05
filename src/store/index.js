import Vue from 'vue';
import Vuex from 'vuex';

import identity from './identity.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    identity
  }
});
