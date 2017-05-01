<template>
  <div>
    <h1 class="title">Leaderboard</h1>
    <table>
      <tr v-for="result in leaderboard">
        <td>{{result.category}}</td>
        <td>{{result.leader.name}}</td>
        <td>{{result.leader.time}}</td>
      </tr>
    </table>
  </div>
</template>
<script>
  export default {
    name: 'leaderboard',
    computed: {
      leaderboard () {
        return this.$store.state.leaderboard
      }
    }
  }
</script>
