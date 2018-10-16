<template>
  <b-container fluid>
    <!-- <log-out class="my-1 logout"></log-out> -->
    <h1 class="header">Quote</h1>
    <div class="history">
      <div class="history__repairshop-block history__repairshop-block--background"
        v-for="item in history"
        v-bind:key="item.id"
        v-b-popover.hover="showTime(item.created_at)"
        v-bind:class="{'history__repairshop-block--background-me': checkType(item.type)}">
          <span class="history__repairshop-block--text-position">
            {{item.text}}
          </span>
      </div>
    </div>
    <b-form @submit="send($event)" class="new-message">
      <div class="new-message__chat-block new-message__chat-block--position">
        <b-form-textarea
          v-model="message" 
          class="new-message__chat-block--size"
          placeholder="Enter message">
        </b-form-textarea>
        <b-button :variant="'success'" 
          class="new-message__send-button new-message__send-button--position"
          type="submit">
            Send
        </b-button>
      </div>
    </b-form>
  </b-container>
</template>

<script>
import LogOut from "~/components/LogOut";
import socket from '~/plugins/socket.io';

export default {
  components: {
    LogOut
  },
  data() {
    return {
      history: [],
      repairShop: {},
      customer: {},
      message: ''
    };
  },
  beforeMount() {
    socket.emit('join', { quote_id: this.$route.params.id });
    socket.on('connect');
    socket.on('messages', data => {
      this.history = data.data.Messages.reverse();
      this.customer = data.data.Customer;
      this.repairShop = data.data.Repairshop;
    });
    socket.on('newMessage', data => {
      this.history.push(data.data);
    });
  },
  methods: {
    send(event) {
      event.preventDefault();
      if (this.message) {
        socket.emit('sendMessage', {
          quote_id: this.$route.params.id,
          text: this.message
        });
        this.message = '';
      }
    },

    showTime(date) {
      const time = new Date(date);
      // return `${time.getHours()}:${time.getMinutes()}`;
      return `${time.toLocaleDateString()} ${time.toLocaleTimeString()}`;
    },

    checkType(type) {
      return this.$store.state.user.type === type;
    }
  }
};
</script>

<style lang="scss">
.header {
  text-align: center;
}
.new-message {
  &__chat-block {
    width: 500px;
    &--position {
      margin: auto;
    }
    &--size {
      width: 500px;
      height: 90px !important;
      resize: none;
    }
  }
  &__send-button {
    &--position {
      float: right;
      margin-top: 10px;
    }
  }
  margin-top: 30px;
}

.history {
  width: 500px;
  margin: auto;
  &__repairshop-block {
    width: 300px;
    &--background {
      background-color: #efeeee;
      border-radius: 4px;
      float: left;
      margin-bottom: 10px;
    }
    &--background-me {
      background-color: #b0dffe;
      float: right;
      margin-bottom: 10px;
    }
    &--text-position {
      display: inline-block;
      text-align: left;
      padding: 10px;
    }
    margin-top: 5px;
  }
  margin-top: 25px;
}

.logout {
  float:right;
}
</style>