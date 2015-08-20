module.exports = engine
engine.filter = filter
engine.move = move
engine.select = select

// initialize list
function engine (list) {
  function addHighlight (v) {
    return { value: v, highlighted: false }
  }
  return list.map(addHighlight)
}

function match (fn) {
  return function (o) {
    return fn(o.value)
  }
}

// filter list
function filter (criteria, list) {
  var exp = new RegExp(criteria)
  return list.filter(match(exp.test))
}

// move
function move (direction, list) {
  var currentIndex = -1
  list.forEach(function (item, index) {
    if (item.highlighted) {
      currentIndex = index
      item.highlighted = false
    }
  })

  if (direction === 'up' && currentIndex > 0) currentIndex -= 1
  if (direction === 'down' && currentIndex < (list.length - 1)) currentIndex += 1

  list[currentIndex].highlighted = true
  return list
}

function select (list) {
  function highlighted (i) {
    return i.highlighted === true
  }
  return list.filter(highlighted)[0].value
}