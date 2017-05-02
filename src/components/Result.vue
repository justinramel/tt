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
    <b-table-column field="Result" label="Best Result" sortable :custom-sort="byResult"/>
    <b-table-column field="Speed" label="Speed" sortable/>
    <b-table-column field="Date" label="Date" sortable :custom-sort="byDate"/>
    <b-table-column field="Course" label="Course" sortable/>
    <b-table-column field="Position" label="Position" sortable/>
  </b-table>
</template>
<script>
  import {byStartTime, byResult, byDate} from '../sort'

  export default {
    name: 'result',
    methods: {
      byStartTime,
      byResult,
      byDate
    },
    computed: {
      results () {
        return this.$store.getters.getResultsSortedBy('Result')
      }
    }
  }
</script>
