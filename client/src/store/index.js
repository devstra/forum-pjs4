import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)


//Le store est l'endroid ou on pourra mettre des variables qui seront accessible depuis n'importe quelle vue ou components
//Ls variables "globale" sont appelé ici states
//Le module vuex-persit nous permet de sauvegarder l'état des variables si le gars refresh la page
//On à donc des variables accessible depuis n'importe quelle VUE et qui ne disparaissent pas si on refresh

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {

    initUserInstance(state, user) {
      state.user = user;
    },

    destroyUserInstance(state) {
      state.user = null;
    }



  },
  actions: {
    initUserInstanceAction(context, user) {
      // console.log("PASSED");
      // console.log(user);
      context.commit('initUserInstance', user);
    },
    destroyUserInstanceAction(context){
      context.commit("destroyUserInstance");
    }
  },
  getters : {
    getUser : (state) => {
      return state.user;
    }
  },
  plugins: [new VuexPersistence().plugin],
  modules: {
  }
})
