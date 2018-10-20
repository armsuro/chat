<template>
  <div class="my-1">
    <h4>Pending quotes</h4>    
    <div>
      <b-table striped hover :items="repairShopData" :fields="fields">
        <template slot="actions" slot-scope="row">
          <b-button size="sm" :variant="'success'" @click="assignToQuote(row.item.id)">
              Assign
          </b-button>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'repairShopData', 'fields', 'assignToQuote'
  ]
}
</script>

