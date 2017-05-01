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

export const byStartTime = sortTime('Start Time')
export const byPB10 = sortTime('PB 10')
export const byPB25 = sortTime('PB 25')
export const byPB50 = sortTime('PB 50')
export const byPB100 = sortTime('PB 100')
export const byResult = sortTime('Result')
export const byDate = sortTime('Date')
