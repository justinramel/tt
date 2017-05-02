<template>
  <b-table
    :data="results"
    :bordered=true
    :striped=true
    :narrowed=true
    :selectable=true>
    <b-table-column field="Order" label="Pos" sortable/>
    <b-table-column field="Start Number" label="No" sortable/>
    <b-table-column field="Start Time" label="Start Time" sortable :custom-sort="byStartTime"/>
    <b-table-column field="Rider" label="Rider" sortable/>
    <b-table-column field="Club" label="Club" sortable/>
    <b-table-column field="Gender" label="Gender" sortable/>
    <b-table-column field="Category" label="Category" sortable/>
    <b-table-column field="PB 10" label="PB 10" sortable :custom-sort="byPB10"/>
  </b-table>
</template>
<script>
  import {byStartTime, byPB10} from '../sort'

  export default {
    name: 'pb10',
    methods: {
      byStartTime,
      byPB10
    },
    computed: {
      results () {
        return this.$store.getters.getResultsSortedBy('PB 10')
      }
    }
  }
</script>
