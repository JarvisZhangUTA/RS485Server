import { getToken, setToken, removeToken } from '@/utils/auth';

const user = {
  state: {
    token: '',
    user: null
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USER: (state, user) => {
      state.user = user;
    }
  },
  actions: {
    setUser({commit}, user) {
      commit('SET_USER', user);
    },
    setToken({commit}, token) {
      commit('SET_TOKEN', token)
    }
  }
}

export default user;