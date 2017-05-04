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
  export default {
    name: 'race-selector',
    props: ['worksheet'],
    created () {
      this.fetchData()
    },
    methods: {
      fetchData () {
        if (!this.$props.worksheet) return
        this.$store.dispatch('setRaceWorksheet', this.$props.worksheet)
      }
    },
    watch: {
      '$route': 'fetchData'
    },
    computed: {
      race: {
        get () {
          return this.$props.worksheet
        },
        set (worksheet) {
          if (worksheet) {
            this.$router.push({name: 'startsheet', params: {worksheet}})
          } else {
            this.$router.push({name: 'root'})
          }
        }
      },
      options () {
        return this.$store.state.races
      }
    }
  }
</script>
