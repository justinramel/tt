<template>
  <b-field>
    <b-select
      v-model="club"
      placeholder="Filter by Club"
      size="is-large"
      expanded>
      <b-option
        v-for="option in options"
        :value="option.key"
        :key="option.keye">
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
    props: ['name'],
    computed: {
      club: {
        get () {
          return this.$props.name
        },
        set (name) {
          if (name) {
            this.$router.push({name: 'club-startsheet', params: {name: slugify(name)}})
          } else {
            this.$router.push({name: 'startsheet'})
          }
        }
      },
      options () {
        return this.$store.getters.getClubs()
      }
    }
  }
</script>
