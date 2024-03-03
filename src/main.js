import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import "vue3-toastify/dist/index.css";
import piniaPersist from 'pinia-plugin-persist'

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

const pinia = createPinia()
pinia.use(piniaPersist)

app.use(pinia);
app.use(router);

app.mount("#app");
