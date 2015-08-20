var app = require('xfx')
var h = app.h

module.exports = main
main.render = render

var typeahead = require('../')

function main () {
  var state = {}
  state.colors = typeahead(['blue', 'green', 'red', 'yellow'])
  return state
}

function render (state) {
  return h('div', [
    h('h1', 'Typeahead'),
    typeahead.render(state.colors)
  ])
}
