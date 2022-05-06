import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// TODO 路由访问权限控制
import "./permission";
// import store from './store'
import { createPinia } from "pinia";

import "virtual:svg-icons-register";
import "@/assets/styles/index.scss"; // global css

const app = createApp(App);

app.use(router);
app.use(createPinia());
app.mount("#app");
