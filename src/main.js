import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import "element-ui/lib/theme-chalk/index.css";
import "@/assets/styles/main.sass";
import ElementUi from "element-ui";
import "@/mock";
Vue.use(ElementUi);
Vue.prototype.$http = axios;

new Vue({
    router,
    render: h => h(App)
}).$mount("#app");
