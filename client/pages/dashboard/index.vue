<template>
  <b-container fluid>
    <h1>Dashboard</h1>
    <!-- <log-out class="logout"></log-out> -->
    <active-quotes :quoteData="quoteData"
      :fields="fields"
      :deleteQuote="deleteQuote"
      :joinQuote="joinQuote"
      :editQuote="editQuote"
      :checkCustomer="checkCustomer">
    </active-quotes>

    <div v-if="hideQuoteForm && checkCustomer()">
      <div>
        <b-button :variant="'success'" 
          type="button" 
          @click="hideQuoteForm = false">
            Create quote
        </b-button>
      </div>
    </div>
    <create-quote-form v-if="!hideQuoteForm"
      :form="form"
      :createUpdateQuote="createUpdateQuote"
      :hideForm="hideForm">
    </create-quote-form>

    <pending-quotes 
      :repairShopData="repairShopData"
      :fields="fields"
      :assignToQuote="assignToQuote"
      v-if="checkRepairshop()">
    </pending-quotes>
  
  </b-container>
</template>

<script>
import axios from '~/plugins/axios';
import ActiveQuotes from '~/components/ActiveQuotes';
import PendingQuotes from '~/components/PendingQuotes';
import CreateQuoteForm from '~/components/CreateQuoteForm';
import LogOut from "~/components/LogOut";
import { API } from '~/constants/env-vars.js';
import { CUSTOMER, REPAIR_SHOP } from '~/constants/user-types';
import Cookie from 'js-cookie';

export default {
  name: 'dashboard',
  components: {
    ActiveQuotes,
    PendingQuotes,
    CreateQuoteForm,
    LogOut
  },
  data() {
    return {
      form: {
        id: null,
        name: '',
        error: false,
        errorMessage: ''
      },
      hideQuoteForm: true,
      forQuoteUpdate: false,
      index: null,
      fields: ['id', 'username', 'name', 'created_at', 'actions']
    };
  },
  async asyncData({ params }, callback) {
    try {
      const response = await axios().get(`${API}/quote`);
      const quoteData = response.data.data.map(quote => ({
        id: quote.id,
        username: quote.Customer.username,
        name: quote.name,
        created_at: quote.created_at
      }));
      const returnObj = {
        quoteData,
        repairShopData: []
      };
      if (this.$nuxt.$store.state.user.type === REPAIR_SHOP) {
        const response = await axios().get(`${API}/quote/waiting`);
        const repairShopData = response.data.data.map(item => ({
          id: item.id,
          name: item.name,
          created_at: item.created_at
        }));
        returnObj.repairShopData = repairShopData;
      }
      callback(null, { ...returnObj });
    } catch (error) {
      callback(null, { quoteData: [], repairShopData: [] });
    }
  },
  methods: {
    async createUpdateQuote(event) {
      event.preventDefault();
      const { id, name } = this.form;
      if (!name.length) {
        this.form.error = true;
        this.form.errorMessage = 'Quote message cannot be blank!';
        return false;
      }
      try {
        if (this.forQuoteUpdate) {
          const response = await axios().put(`${API}/quote/${this.form.id}`, {
            id,
            name
          });
          this.quoteData[this.index].name = response.data.data.name;
          this.hideQuoteForm = true;
          return true;
        }
        const response = await axios().post(`${API}/quote`, { name });
        this.quoteData.push(response.data.data);
        this.hideQuoteForm = true;
      } catch (error) {
        this.form.error = true;
        this.form.errorMessage = `${error}`;
      }
    },

    async editQuote(row) {
      this.form.name = row.item.name;
      this.form.id = row.item.id;
      this.index = row.index;
      this.hideQuoteForm = false;
      this.forQuoteUpdate = true;
    },

    async deleteQuote(row) {
      try {
        await axios().delete(`${API}/quote/${row.item.id}`);
        this.quoteData.splice(row.index, 1);
      } catch (error) {
        alert(error);
      }
    },

    async assignToQuote(row) {
      try {
        const response = await axios().put(
          `${API}/quote/assign/${row.item.id}`
        );
        this.joinQuote();
      } catch (error) {
        alert(error);
      }
    },

    async joinQuote({ item }) {
      this.$router.push(`/quote/${item.id}`);
    },

    checkRepairshop() {
      return this.$store.state.user.type === REPAIR_SHOP;
    },

    checkCustomer() {
      return this.$store.state.user.type === CUSTOMER; 
    },

    hideForm() {
      this.hideQuoteForm = true;
    }
  }
};
</script>

<style lang="scss">
.logout {
  margin-left:1809px;
  margin-top:-79px;
}
</style>
