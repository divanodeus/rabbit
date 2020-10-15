import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "ress";
import "./plugins/element.js";
import "./style/index.less";

Vue.config.productionTip = false;

new Vue({
  router,
  render: function(h) {
    return h(App);
  }
}).$mount("#app");
