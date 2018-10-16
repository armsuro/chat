<template>
  <b-container class="login-block">
    <h1 class="login-block__header--position login-block__header--color">Sign In</h1>

    <b-form @submit="onSubmit($event)">
      <b-row class="my-1">
        <b-col sm="4"></b-col>
        <b-col sm="4">
          <b-form-input id="username" 
            type="text"   
            v-model="credentials.username"
            placeholder="Username"
            class="login-block__input--position">
          </b-form-input>
        </b-col>
      </b-row>

      <b-row class="my-1">
        <b-col sm="4"></b-col>
        <b-col sm="4">
          <b-form-input placeholder="Password" 
            id="password"   
            type="password" 
            v-model="credentials.password"
            class="login-block__input--position">
          </b-form-input>
        </b-col>
      </b-row>

      <b-row class="my-1" v-if="credentials.error">
        <b-col sm="4"></b-col>
        <b-col sm="4" class="login-block__button--position">
          <b-alert show variant="danger">{{credentials.errorMessage}}</b-alert>
        </b-col>
      </b-row>

      <b-row class="my-1">
        <b-col sm="4"></b-col>
        <b-col sm="4" class="login-block__button--position">
          <b-button :variant="'success'" type="submit">
              Sign In
          </b-button>
        </b-col>
      </b-row>
    </b-form>
  </b-container>
</template>

<script>
import Cookie from 'js-cookie';
import axios from '../../plugins/axios';
import { API } from '../../constants/env-vars';
import { mapMutations } from 'vuex';

export default {
  name: 'loginForm',
  data() {
    return {
      credentials: {
        username: '',
        password: '',
        error: false,
        errorMessage: 'Invalid credentials'
      }
    };
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault();
      const { username, password } = this.credentials;
      if (!username || !password) {
        this.credentials.error = true;
        return false;
      }
      try {
        const response = await axios().post(`${API}/auth/login`, {
          username,
          password
        });
        this.$store.commit('user/login', response.data.data);
        location.reload();
      } catch (error) {
        this.credentials.error = true;
      }
    },

    ...mapMutations({
      user: 'user/login'
    })
  }
};
</script>

<style lang="scss">
.login-block {
  margin-top: 350px;
  &__header {
    &--position {
      margin-bottom: 15px;
      text-align: center;
    }
    &--color {
      color: #898888;
    }
  }
  &__button {
    &--position {
      margin-top: 10px;
      text-align: center;
    }
  }
  &__input {
    &--position {
      margin-bottom: 5px;
    }
  }
}
</style>
