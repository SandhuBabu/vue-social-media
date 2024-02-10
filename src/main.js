import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";

import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "./assets/styles/css_variables.css"
import 'vue-toast-notification/dist/theme-sugar.css';

const app = createApp(App);
app.use(router);

app.mount("#app");
