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
        {{ option.Name }}
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
  import store, {empty} from '../store'

  export default {
    name: 'race-selector',
    props: ['worksheet'],
    beforeRouteEnter (to, from, next) {
      if (to.name === 'root') {
        store.dispatch('clear').then(() => next())
      } else {
        store.dispatch('setRaceWorksheet', to.params).then(() => next())
      }
    },
    beforeRouteUpdate (to, from, next) {
      store.dispatch('setRaceWorksheet', to.params).then(() => next())
    },
    computed: {
      race: {
        get () {
          return this.$props.worksheet
        },
        set (worksheet) {
          if (empty(worksheet)) {
            this.$router.push({name: 'root'})
          } else {
            if (worksheet !== this.$props.worksheet) {
              this.$router.push({name: 'startsheet', params: {worksheet}})
            }
          }
        }
      },
      options () {
        return this.$store.state.races
      }
    }
  }
</script>
