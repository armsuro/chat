<template>
  <div>
      <h4>Active Quotes</h4>
      <b-table striped hover :items="quoteData" :fields="fields">
        <template slot="actions" slot-scope="row">
          <b-button size="sm" :variant="'success'" @click="joinQuote(row.item.id)">
            Join
          </b-button>
          <b-button size="sm" :variant="'info'" @click="editQuote(row)" v-if="checkCustomer()">
            Edit
          </b-button>
          <b-button size="sm" :variant="'danger'" @click="deleteQuote(row)" v-if="checkCustomer()">
            Delete
          </b-button>
        </template>
      </b-table>
    </div>
</template>

<script>
export default {
  props: [
    'quoteData', 'fields', 'joinQuote', 'editQuote', 'deleteQuote', 'checkCustomer'
  ]
}
</script>
