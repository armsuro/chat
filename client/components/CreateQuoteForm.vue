<template>
  <b-form @submit="createUpdateQuote($event)">
    <h1>Create Quote</h1>
    <b-row class="my-1">
      <b-col sm="4">
        <b-form-input id="username" 
          type="text"   
          v-model="form.name"
          placeholder="Enter quote message">
        </b-form-input>
      </b-col>
    </b-row>
    <b-row class="my-1" v-if="form.error">
      <b-col sm="4">
        <b-alert show variant="danger">{{form.errorMessage}}</b-alert>
      </b-col>
    </b-row>
    <b-row class="my-1">
      <b-col sm="4">
        <b-button :variant="'success'" type="submit">
          Save
        </b-button>
        <b-button :variant="'danger'" type="button" @click="hideForm">
          Cancel
        </b-button>
      </b-col>
    </b-row>
  </b-form>
</template>

<script>
export default {
  props: [
    'form', 'createUpdateQuote', 'hideForm'
  ],
}
</script>

