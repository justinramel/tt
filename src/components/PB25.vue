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
    <b-table-column field="PB 25" label="PB 25" sortable :custom-sort="byPB25"/>
  </b-table>
</template>
<script>
  import {byStartTime, byPB25} from '../sort'

  export default {
    name: 'pb25',
    methods: {
      byStartTime,
      byPB25
    },
    computed: {
      results () {
        return this.$store.getters.getResultsSortedBy('PB 25')
      }
    }
  }
</script>
