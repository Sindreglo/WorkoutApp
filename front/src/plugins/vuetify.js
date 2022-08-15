import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                component: '#ffffff',
                background: '#F5F5F5',
                text: '#000000'
            },
            dark: {
                component: '#2a2a2a',
                background: '#1E1E1E',
                text: '#000000'
            },
        },
    },
});
