<template>
  <b-table
    :data="results"
    :bordered=true
    :striped=true
    :narrowed=true
    :selectable=true>
    <b-table-column field="Start Number" label="No" sortable/>
    <b-table-column field="Start Time" label="Start Time" sortable :custom-sort="byStartTime"/>
    <b-table-column field="Rider" label="Rider" sortable/>
    <b-table-column field="Club" label="Club" sortable/>
    <b-table-column field="Gender" label="Gender" sortable/>
    <b-table-column field="Category" label="Category" sortable/>
    <b-table-column field="PB 50" label="PB 50" sortable :custom-sort="byPB50"/>
  </b-table>
</template>
<script>
  import {byStartTime, byPB50} from '../sort'

  export default {
    name: 'pb50',
    methods: {
      byStartTime,
      byPB50
    },
    computed: {
      results () {
        return this.$store.getters.getResultsSortedBy('PB 50')
      }
    }
  }
</script>
