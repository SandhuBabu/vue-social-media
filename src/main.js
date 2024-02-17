import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import { createPinia } from "pinia";
import { isAuthenticated } from './firebase/util'
import { getUserDataFromDB } from './firebase/services'
import {useUserStore} from './store/userStore'

import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "./assets/styles/css_variables.css"
import 'vue-toast-notification/dist/theme-sugar.css';


const app = createApp(App);
const pinia = createPinia();
app.use(pinia)
app.use(router);

const mountApp = async () => {
    const {setUser} = useUserStore()
    try {
        const {uid} = await isAuthenticated();
        const user = await getUserDataFromDB(uid)
        setUser(user.data);
    } catch (error) {
    } finally {
        app.mount("#app");
    }
    
}

mountApp()

