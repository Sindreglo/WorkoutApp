import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                component: '#F5F5F5',
            },
            dark: {
                component: '#2a2a2a',
                background: '#1E1E1E',
            },
        },
    },
});
