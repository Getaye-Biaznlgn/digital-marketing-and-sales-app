import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import BaseModal from './components/BaseModal';
import BaseButton from './components/BaseButton';
import BaseCard from './components/BaseCard'
import TheAlert from './components/TheAlert'
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
const app = createApp(App)
app.component('BaseCard', BaseCard)
app.component('BaseModal', BaseModal);
app.component('BaseButton', BaseButton)
app.component('TheAlert', TheAlert)
app.use(store).use(router).mount('#app')
