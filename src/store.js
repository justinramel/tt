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
    updateLeaderboard (state, payload) {
      Vue.set(state, 'leaderboard', createLeaderboard(payload.race, payload.results))
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
    setRaceWorksheet (context, params) {
      if (empty(params.worksheet)) return
      if (context.state.race === params.worksheet) {
        context.dispatch('setClub', params.name)
        return
      }

      let results = []
      const ds = new Miso.Dataset({
        importer: Miso.Dataset.Importers.GoogleSpreadsheet,
        parser: Miso.Dataset.Parsers.GoogleSpreadsheet,
        key: '1vZHQOwEGtwsLn_VD_0pXWHBC6yy5W2e-Zt4pOYEC3Us',
        worksheet: params.worksheet
      })

      ds.fetch({
        success: function () {
          this.each(function (row) {
            results.push(row)
          })
          context.commit('setRace', params.worksheet)
          context.commit('updateResults', results)
          context.dispatch('setClub', params.name)
        },
        error: function (err) {
          console.log(err)
        }
      })
    },
    setClub (context, name) {
      let filteredResults = []
      if (empty(name)) {
        filteredResults = context.state.results
      } else {
        filteredResults = context.state.results.filter(result => slugify(result.Club) === name)
        name = filteredResults[0].Club
      }
      context.commit('updateFilteredResults', filteredResults)
      context.commit('updateLeaderboard', {race: context.getters.getRaceTitle(), results: filteredResults})
      context.commit('setClub', name)
    },
    clear (context) {
      context.commit('updateResults', [])
      context.commit('updateLeaderboard', {results: []})
      context.commit('updateFilteredResults', [])
      context.commit('setRace', '')
      context.commit('setClub', '')
    }
  },
  getters: {
    hasRace: (state, getters) => () => state.race !== '',
    getResultsSortedBy: (state, getters) => (fieldName) => {
      var results = state.filteredResults.sort(sortTime(getters.getRaceTitle(), fieldName, state.groupByClub))
      for (var i = 0; i < results.length; i++) {
        results[i].Order = i + 1
      }
      return results
    },
    getClubs: (state, getters) => () => {
      const clubs = state.results.map(result => result.Club)
      const uniqueClubs = [...new Set(clubs)]
      return uniqueClubs.sort((a, b) => a.localeCompare(b)).map(club => {
        return {key: slugify(club), name: club}
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

function createLeaderboard (race, results) {
  return [
    {category: 'PB 10', leader: first(results.sort(sortTime(race, 'PB 10')), 'PB 10')},
    {category: 'PB 25', leader: first(results.sort(sortTime(race, 'PB 25')), 'PB 25')},
    {category: 'PB 50', leader: first(results.sort(sortTime(race, 'PB 50')), 'PB 50')},
    {category: 'PB 100', leader: first(results.sort(sortTime(race, 'PB 100')), 'PB 100')},
    {category: 'Best Result', leader: first(results.sort(sortTime(race, 'Result')), 'Result')}
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

function sortTime (race, columnName, groupByClub) {
  return function sort (a, b) {
    if (groupByClub && a.Club !== b.Club) {
      return a.Club < b.Club ? -1 : 1
    }
    if (columnName === 'Result' && a.Course !== b.Course) {
      if (a.Course && a.Course.toLowerCase() === race.toLowerCase()) return -1
      if (b.Course && b.Course.toLowerCase() === race.toLowerCase()) return 1
      let aCourse = a.Course || ''
      let bCourse = b.Course || ''
      return aCourse > bCourse ? -1 : 1
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

export function empty (data) {
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
