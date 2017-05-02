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
    <b-table-column field="PB 100" label="PB 100" sortable :custom-sort="byPB100"/>
  </b-table>
</template>
<script>
  import {byStartTime, byPB100} from '../sort'

  export default {
    name: 'pb100',
    methods: {
      byStartTime,
      byPB100
    },
    computed: {
      results () {
        return this.$store.getters.getResultsSortedBy('PB 100')
      }
    }
  }
</script>
