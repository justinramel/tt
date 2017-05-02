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
  </b-table>
</template>
<script>
  import {byStartTime} from '../sort'

  export default {
    name: 'startsheet',
    methods: {
      byStartTime
    },
    computed: {
      results () {
        return this.$store.getters.getResultsSortedBy('Start Time')
      }
    }
  }
</script>
