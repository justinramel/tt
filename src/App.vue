<template>
  <section>
    <div class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column is-two-thirds">
              <h1 class="title"><router-link to="/"><a>TT Startsheets</a></router-link></h1>
              <h2 class="subtitle">2017</h2>
              <router-view></router-view>
              <router-view name="club"></router-view>
              <router-view name="raceTitle"></router-view>
            </div>
            <div class="column">
              <router-view name="leaderboard"></router-view>
            </div>
          </div>
        </div>
      </div>
      <div class="hero-foot">
        <router-view name="tabs"></router-view>
      </div>
    </div>

    <div class="container">
      <div class="content">
        <router-view name="tables"></router-view>
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

  export default {
    name: 'app',
    components: {
      Leaderboard
    },
    mounted () {
      this.$store.dispatch('getRaces')
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
