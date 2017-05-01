<template>
  <b-field>
    <b-select
      v-model="race"
      placeholder="Select a race"
      size="is-large"
      expanded>
      <b-option
        v-for="option in options"
        :value="option.Worksheet"
        :key="option.Worksheet">
        {{ option.RaceName }}
      </b-option>
    </b-select>
    <p class="control">
      <button
        class="button is-danger is-large"
        @click="race = ''">
        <b-icon icon="clear"></b-icon>
      </button>
    </p>
  </b-field>
</template>
<script>
  export default {
    name: 'race-selector',
    computed: {
      race: {
        get () {
          return this.$store.state.raceWorksheet
        },
        set (value) {
          this.$store.dispatch('setRaceWorksheet', value)
        }
      },
      options () {
        return this.$store.state.races
      }
    }
  }
</script>
