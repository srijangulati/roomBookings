import VueX from 'vuex';
import Vue from 'vue';
import { RoomModule } from './modules/rooms';

Vue.use(VueX);

export const store = new VueX.Store({
    state:{},
    modules:{
        RoomModule
    }
})