import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import iView from 'iview';
import 'iview/dist/styles/iview.css'; 
import VuejsClipper from 'vuejs-clipper'
import VueQrcode from '@chenfengyuan/vue-qrcode';
Vue.component(VueQrcode.name,VueQrcode)
Vue.config.productionTip = false;
Vue.use(iView);
Vue.use(VuejsClipper)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
