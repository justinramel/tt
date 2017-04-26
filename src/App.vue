<template>
  <section>
    <div class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column is-two-thirds">
              <h1 class="title">TT Startsheets</h1>
              <h2 class="subtitle">2016</h2>
            </div>
            <div class="column">
              <h1 class="title">Leaderboard</h1>
              <table>
                <tr v-for="result in leaderboard">
                  <td>{{result.category}}</td>
                  <td>{{result.leader.name}}</td>
                  <td>{{result.leader.time | formatTime}}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="hero-foot">
        <nav class="tabs is-boxed">
          <div class="container">
            <ul>
              <li v-bind:class="{ 'is-active': category === '*'}"><a v-on:click="filter('*')">Start Number</a></li>
              <li v-bind:class="{ 'is-active': category === 'PB 10'}"><a v-on:click="filter('PB 10')">PB 10</a></li>
              <li v-bind:class="{ 'is-active': category === 'PB 25'}"><a v-on:click="filter('PB 25')">PB 25</a></li>
              <li v-bind:class="{ 'is-active': category === 'PB 50'}"><a v-on:click="filter('PB 50')">PB 50</a></li>
              <li v-bind:class="{ 'is-active': category === 'PB 100'}"><a v-on:click="filter('PB 100')">PB 100</a></li>
              <li v-bind:class="{ 'is-active': category === 'Result'}"><a v-on:click="filter('Result')">Best Result</a></li>
            </ul>
          </div>
        </nav>
      </div>
    </div>

    <div class="container">
      <div class="content">
          <div class="icon-at-kom-1"></div>
        <br>
        <b-table
            :data="filteredResults"
            :bordered=true
            :striped=true
            :narrowed=true
            :selectable=true>

            <b-table-column field="Start Number" label="No" sortable/>
            <b-table-column field="Start Time" label="Start Time" sortable :custom-sort="sortStartTime" :format="formatTime"/>
            <b-table-column field="Rider" label="Rider" sortable/>
            <b-table-column field="Club" label="Club" sortable/>
            <b-table-column field="Gender" label="Gender" sortable/>
            <b-table-column field="Category" label="Category" sortable/>

            <b-table-column v-if="category === 'PB 10'" field="PB 10" label="PB 10" sortable :custom-sort="sortPB10" :format="formatTime"/>
            <b-table-column v-if="category === 'PB 25'" field="PB 25" label="PB 25" sortable :custom-sort="sortPB25" :format="formatTime"/>
            <b-table-column v-if="category === 'PB 50'" field="PB 50" label="PB 50" sortable :custom-sort="sortPB50" :format="formatTime"/>
            <b-table-column v-if="category === 'PB 100'" field="PB 100" label="PB 100" sortable :custom-sort="sortPB100" :format="formatTime"/>
            <b-table-column v-if="category === 'Result'" field="Result" label="Result" sortable :custom-sort="sortResult" :format="formatTime"/>
            <b-table-column v-if="category === 'Result'" field="Speed" label="Speed" sortable/>
            <b-table-column v-if="category === 'Result'" field="Date" label="Date" sortable :custom-sort="sortDate" :format="formatTime"/>
            <b-table-column v-if="category === 'Result'" field="Course" label="Course" sortable/>
            <b-table-column v-if="category === 'Result'" field="Position" label="Position" sortable/>
        </b-table>
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
  /* global Miso */
  export default {
    name: 'app',
    data () {
      return {
        headers: [],
        category: '*',
        results: [],
        filteredResults: [],
        leaderboard: []
      }
    },
    created () {
      let that = this
      const ds = new Miso.Dataset({
        importer: Miso.Dataset.Importers.GoogleSpreadsheet,
        parser: Miso.Dataset.Parsers.GoogleSpreadsheet,
        key: '1vZHQOwEGtwsLn_VD_0pXWHBC6yy5W2e-Zt4pOYEC3Us',
        worksheet: '2'
      })

      ds.fetch({
        success: function () {
          that.headers = ds.columnNames()
          this.each(function (row) {
            that.results.push(row)
          })
          that.results.sort((a, b) => a['Start Number'] - b['Start Number'])
          that.leaderboard = createLeaderboard(that.results)
          that.filteredResults = that.results
        },
        error: function (err) {
          console.log(err)
        }
      })
    },
    methods: {
      filter (category) {
        this.category = category
        this.filteredResults = this.results.sort(sortTime(category))
      },
      formatTime: formatTime,
      sortStartTime: sortTime('Start Time'),
      sortPB10: sortTime('PB 10'),
      sortPB25: sortTime('PB 25'),
      sortPB50: sortTime('PB 50'),
      sortPB100: sortTime('PB 100'),
      sortResult: sortTime('Result'),
      sortDate: sortTime('Date')
    },
    filters: {
      formatTime: formatTime
    }
  }

  function formatTime (time) {
    if (!isNumeric(time)) return time
    return parseFloat(Math.round(time * 100) / 100).toFixed(2)
  }

  function sortTime (columnName) {
    return function sort (a, b) {
      const colA = a[columnName]
      const colB = b[columnName]
      if (empty(colA)) return 1
      if (empty(colB)) return -1
      const da = new Date(`Wed Apr 26 2017 ${colA} GMT+0100 (BST)`)
      const db = new Date(`Wed Apr 26 2017 ${colB} GMT+0100 (BST)`)
      return da - db
    }
  }

  function isNumeric (n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
  }

  function empty (data) {
    if (typeof (data) === 'number' || typeof (data) === 'boolean') {
      return false
    }
    if (typeof (data) === 'undefined' || data === null) {
      return true
    }
    if (typeof (data.length) !== 'undefined') {
      return data.length === 0
    }
    var count = 0
    for (var i in data) {
      if (data.hasOwnProperty(i)) {
        count++
      }
    }
    return count === 0
  }

  function createLeaderboard (results) {
    return [
      {category: 'PB 10', leader: first(results.sort(sortTime('PB 10')), 'PB 10')},
      {category: 'PB 25', leader: first(results.sort(sortTime('PB 25')), 'PB 25')},
      {category: 'PB 50', leader: first(results.sort(sortTime('PB 50')), 'PB 50')},
      {category: 'PB 100', leader: first(results.sort(sortTime('PB 100')), 'PB 100')},
      {category: 'Best Result', leader: first(results.sort(sortTime('Result')), 'Result')}
    ]
  }

  function first (results, fieldName) {
    if (results instanceof Array && results.length > 0) {
      return {
        name: results[0].Rider,
        time: results[0][fieldName]
      }
    } else {
      return {
        name: 'Could be you!',
        time: '--.--'
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
