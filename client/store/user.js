import Cookies from 'js-cookie';

export const state = () => {
  try {
    state.user = JSON.parse(Cookies.get('user'));
    return state.user;
  } catch (error) {
    return { user: null };
  }
};

export const mutations = {
  async login(state, user) {
    const { token, username, type } = user;
    state.user = { token, username, type };
    await Cookies.set('user', JSON.stringify(state.user));
  },
  logout(state) {
    Cookies.remove('user');
    state.user = null;
  }
};
