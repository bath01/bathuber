import { createApp } from "vue";
import App from "./App.vue";
//import router from "./router";

// eslint-disable-next-line no-unused-vars
import { createRouter, createMemoryHistory } from "vue-router";
import Home from "./page/home.vue";

const routes = [{ path: "/", component: Home }]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

const VueApp = createApp(App);

VueApp.use(router);

VueApp.mount("#app");

createApp(App).use(router).mount("#app");
