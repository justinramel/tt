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
  import slugify from '../slugify'

  export default {
    name: 'club-selector',
    props: ['worksheet', 'name'],
    created () {
      this.fetchData()
    },
    methods: {
      fetchData () {
        if (!this.$props.name) return
        this.$store.dispatch('setClub', this.$props.name)
      }
    },
    watch: {
      // call again the method if the route changes
      '$route': 'fetchData'
    },
    computed: {
      club: {
        get () {
          return this.$props.name
        },
        set (name) {
          if (name) {
            debugger
            name = slugify(name)
            this.$router.push({name: 'club-startsheet', params: {name}})
          } else {
            this.$router.push({name: 'startsheet', params: {worksheet: this.$props.worksheet}})
          }
        }
      },
      options () {
        return this.$store.getters.getClubs()
      }
    }
  }
</script>
