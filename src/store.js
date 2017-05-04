/* global Miso */
import Vue from 'vue'
import Vuex from 'vuex'
import slugify from './slugify'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    races: [],
    results: [],
    filteredResults: [],
    leaderboard: [],
    race: '',
    club: ''
  },
  mutations: {
    addRaces (state, races) {
      Vue.set(state, 'races', races)
    },
    updateResults (state, results) {
      Vue.set(state, 'results', results)
    },
    updateLeaderboard (state, results) {
      Vue.set(state, 'leaderboard', createLeaderboard(results))
    },
    updateFilteredResults (state, results) {
      Vue.set(state, 'filteredResults', results)
    },
    setRace (state, value) {
      Vue.set(state, 'race', value)
    },
    setClub (state, value) {
      Vue.set(state, 'club', value)
    }
  },
  actions: {
    getRaces (context) {
      let races = []
      const ds = new Miso.Dataset({
        importer: Miso.Dataset.Importers.GoogleSpreadsheet,
        parser: Miso.Dataset.Parsers.GoogleSpreadsheet,
        key: '1vZHQOwEGtwsLn_VD_0pXWHBC6yy5W2e-Zt4pOYEC3Us',
        worksheet: '1'
      })

      ds.fetch({
        success: function () {
          this.each(function (row) {
            races.push(row)
          })
          context.commit('addRaces', races)
        },
        error: function (err) {
          console.log(err)
        }
      })
    },
    setRaceWorksheet (context, worksheet) {
      if (context.state.race === worksheet) {
        context.dispatch('setClub', '')
        return
      }

      let results = []
      const ds = new Miso.Dataset({
        importer: Miso.Dataset.Importers.GoogleSpreadsheet,
        parser: Miso.Dataset.Parsers.GoogleSpreadsheet,
        key: '1vZHQOwEGtwsLn_VD_0pXWHBC6yy5W2e-Zt4pOYEC3Us',
        worksheet: worksheet
      })

      ds.fetch({
        success: function () {
          this.each(function (row) {
            results.push(row)
          })
          context.commit('setRace', worksheet)
          context.commit('updateResults', results)
          context.dispatch('setClub', '')
        },
        error: function (err) {
          console.log(err)
        }
      })
    },
    setClub (context, club) {
      let filteredResults = []
      if (club === '') {
        filteredResults = context.state.results
      } else {
        filteredResults = context.state.results.filter(result => slugify(result.Club) === club)
      }
      context.commit('updateFilteredResults', filteredResults)
      context.commit('updateLeaderboard', filteredResults)
      context.commit('setClub', club)
    }
  },
  getters: {
    hasRace: (state, getters) => () => state.race !== '',
    getResultsSortedBy: (state, getters) => (fieldName) => {
      var results = state.filteredResults.sort(sortTime(fieldName, state.groupByClub))
      for (var i = 0; i < results.length; i++) {
        results[i].Order = i + 1
      }
      return results
    },
    getClubs: (state, getters) => () => {
      const clubs = state.results.map(result => result.Club)
      const uniqueClubs = [...new Set(clubs)]
      return uniqueClubs.sort((a, b) => a.localeCompare(b)).map(club => {
        return {name: club}
      })
    },
    getRiderCount: (state, getters) => () => {
      return state.filteredResults.length > 0 ? ` - ${state.filteredResults.length} Riders` : ''
    },
    getRaceTitle: (state, getters) => () => {
      if (getters.hasRace()) {
        const race = state.races[state.race - 2]
        return race.Title
      } else {
        return ''
      }
    }
  }
})

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

function sortTime (columnName, groupByClub) {
  return function sort (a, b) {
    if (groupByClub && a.Club !== b.Club) {
      return a.Club < b.Club ? -1 : 1
    }
    const colA = a[columnName]
    const colB = b[columnName]
    if (empty(colA)) return 1
    if (empty(colB)) return -1
    const da = new Date(`Wed Apr 26 2017 ${colA} GMT+0100 (BST)`)
    const db = new Date(`Wed Apr 26 2017 ${colB} GMT+0100 (BST)`)
    return da - db
  }
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
