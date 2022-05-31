import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./assets/style.css";

import BaseDialog from "./components/UI/Modal.vue"
import BudgetUsage from "./components/UI/BudgetUsage.vue"
const app = createApp(App);
app.use(router);
app.use(store);
app.component('base-dialog', BaseDialog);
app.component('base-budge', BudgetUsage);

app.mount('#app');



