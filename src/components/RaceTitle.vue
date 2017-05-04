<template>
  <b-field>
    <h1 class="title">{{raceTitle}} {{club}} {{riderCount}}</h1>
  </b-field>
</template>
<script>
  export default {
    name: 'race-title',
    computed: {
      raceTitle () {
        return this.$store.getters.getRaceTitle()
      },
      club () {
        return this.$store.state.club
      },
      riderCount () {
        return this.$store.getters.getRiderCount()
      }
    }
  }
</script>
