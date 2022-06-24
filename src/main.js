import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import BaseModal from './components/BaseModal';
import BaseButton from './components/BaseButton';
import BaseCard from './components/BaseCard'
import TheAlert from './components/TheAlert'
import DetailPage from './components/DetailPage'
import CKEditor from '@ckeditor/ckeditor5-vue';
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/resources/main.css"
// 
const app = createApp(App)
app.component('BaseCard', BaseCard)
app.component('BaseModal', BaseModal);
app.component('BaseButton', BaseButton)
app.component('TheAlert', TheAlert)
app.component('DetailPage', DetailPage)
app.use(store).use(CKEditor).use(router).mount('#app')
