/* global Miso */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    results: [],
    leaderboard: [],
    groupByClub: false
  },
  mutations: {
    addResults (state, results) {
      state.results = results
    },
    addLeaderboard (state, results) {
      state.leaderboard = createLeaderboard(results)
    },
    setGroupByClub (state, value) {
      Vue.set(state, 'groupByClub', value)
    }
  },
  actions: {
    getResults (context) {
      let results = []
      const ds = new Miso.Dataset({
        importer: Miso.Dataset.Importers.GoogleSpreadsheet,
        parser: Miso.Dataset.Parsers.GoogleSpreadsheet,
        key: '1vZHQOwEGtwsLn_VD_0pXWHBC6yy5W2e-Zt4pOYEC3Us',
        worksheet: '2'
      })

      ds.fetch({
        success: function () {
          this.each(function (row) {
            results.push(row)
          })
          context.commit('addResults', results)
          context.commit('addLeaderboard', results)
        },
        error: function (err) {
          console.log(err)
        }
      })
    }
  },
  getters: {
    getResultsSortedBy: (state, getters) => (fieldName) => {
      return state.results.sort(sortTime(fieldName, state.groupByClub))
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
