import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import BaseModal from './components/BaseModal';
import BaseButton from './components/BaseButton';
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
const app = createApp(App)
app.component('BaseModal', BaseModal);
app.component('BaseButton', BaseButton)
app.use(store).use(router).mount('#app')
