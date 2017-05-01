<template>
  <section>
    <div class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column is-two-thirds">
              <h1 class="title">TT Startsheets</h1>
              <h2 class="subtitle">2017</h2>
              <RaceSelector></RaceSelector>
              <ClubSelector></ClubSelector>
            </div>
            <div class="column">
              <Leaderboard></Leaderboard>
            </div>
          </div>
        </div>
      </div>
      <div class="hero-foot">
        <nav class="tabs is-boxed">
          <div class="container">
            <ul>
              <router-link tag="li" to="/"><a>Startsheet</a></router-link>
              <router-link tag="li" to="/PB10"><a>PB 10</a></router-link>
              <router-link tag="li" to="/PB25"><a>PB 25</a></router-link>
              <router-link tag="li" to="/PB50"><a>PB 50</a></router-link>
              <router-link tag="li" to="/PB100"><a>PB 100</a></router-link>
              <router-link tag="li" to="/Result"><a>Best Result</a></router-link>
            </ul>
          </div>
        </nav>
      </div>
    </div>

    <div class="container">
      <div class="content">
        <router-view></router-view>
      </div>
    </div>

    <footer class="footer">
      <div class="container">
        <div class="content">
          <p>Made by <a href="https://twitter.com/justinramel" target="_blank">Justin Ramel</a>.</p>
          </div>
        </div>
    </footer>
  </section>
</template>

<script>
  import Leaderboard from './components/Leaderboard'
  import RaceSelector from './components/RaceSelector'
  import ClubSelector from './components/ClubSelector'

  export default {
    name: 'app',
    components: {
      Leaderboard,
      RaceSelector,
      ClubSelector
    },
    mounted () {
      this.$store.dispatch('getRaces')
      this.$store.dispatch('getResults')
    },
    computed: {
      groupByClub: {
        get () {
          return this.$store.state.groupByClub
        },
        set (value) {
          this.$store.commit('setGroupByClub', value)
        }
      }
    }
  }
</script>

<style lang="sass">
@import "~bulma/sass/utilities/_all"
// Setup colours
$blaydon: #a6192e
$primary: $blaydon
$primary-invert: findColorInvert($primary)


// Links
$link: $primary
$link-invert: $primary-invert
$link-focus-border: $primary

@import "~bulma"
@import "~buefy/src/scss/buefy"

.hero.is-primary
    background-color: $blaydon
    color: #fff

.hero.is-primary .tabs.is-boxed li.is-active a, .hero.is-primary .tabs.is-boxed li.is-active a:hover, .hero.is-primary .tabs.is-toggle li.is-active a, .hero.is-primary .tabs.is-toggle li.is-active a:hover
    color: $blaydon !important
</style>
