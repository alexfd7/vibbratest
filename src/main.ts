import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import '@mdi/font/css/materialdesignicons.css'
import Buefy from 'buefy'
import './assets/scss/app.scss'
import vueMoment from 'vue-moment'
import VueResource from 'vue-resource'
import VueTheMask from 'vue-the-mask'
import moment from 'moment';


require('moment/locale/pt-br')
Vue.use(VueTheMask)


Vue.filter('data', (valor) => {
    if (!valor) return null;
    
    return  moment(valor).format('DD/MM/YYYY');
})

Vue.use(Buefy, {
    defaultDayNames: [
        'Dom',
        'Seg',
        'Ter',
        'Qua',
        'Qui',
        'Sex',
        'Sab'
    ],
    defaultMonthNames: [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro'
    ],
    defaultDatepickerMobileNative: false,
    defaultDateParser: date => {
        const m = moment(date, 'DD/MM/YYYY')
        return m.isValid() ? m.toDate() : null
    }
})


Vue.use(vueMoment)

Vue.use(VueResource)


Vue.config.productionTip = false

new Vue({ 
    router,
    store, 
    render: h => h(App),
}).$mount('#app')
