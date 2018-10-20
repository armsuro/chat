export const state = () => {
  try {
    state.user = JSON.parse(localStorage.getItem('user'));
    return state.user;
  } catch (error) {
    return { user: null };
  }
};

export const mutations = {
  async login(state, user) {
    const { token, username, type } = user;
    state.user = { token, username, type };
    localStorage.setItem('user', JSON.stringify(state.user));
  },
  logout(state) {
    localStorage.removeItem('user');
    state.user = null;
  }
};
