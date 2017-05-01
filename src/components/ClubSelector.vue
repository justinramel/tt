<template>
  <b-field>
    <b-select
      v-model="club"
      placeholder="Filter by Club"
      size="is-large"
      expanded>
      <b-option
        v-for="option in options"
        :value="option.name"
        :key="option.name">
        {{ option.name }}
      </b-option>
    </b-select>
    <p class="control">
      <button
        class="button is-danger is-large"
        @click="club = ''">
        <b-icon icon="clear"></b-icon>
      </button>
    </p>
  </b-field>
</template>
<script>
  export default {
    name: 'club-selector',
    computed: {
      club: {
        get () {
          return this.$store.state.club
        },
        set (value) {
          this.$store.dispatch('setClub', value)
        }
      },
      options () {
        return this.$store.getters.getClubs()
      }
    }
  }
</script>
