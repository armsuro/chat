<template>
  <b-button :variant="'danger'" type="button" @click="logOut">
    Log Out
  </b-button>
</template>

<script>
import axios from '~/plugins/axios';
import { API } from '~/constants/env-vars';
import { mapMutations } from 'vuex';

export default {
  methods: {
    logOut() {
      try {
        axios().post(`${API}/auth/logout`);
        this.$store.commit('user/logout');
        location.reload();
      } catch (error) {
        alert(error);
      }
    },

    ...mapMutations({
      user: 'user/login'
    })
  }
};
</script>

