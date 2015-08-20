var app = require('xfx')
var h = app.h
var sendKey = app.sendKey
var update = app.update
var bindState = app.bindState


var style = require('./style')
var e = require('./engine')

module.exports = component
component.render = render

function component (list) {
  var state = {}
  state.list = e(list)

  state.actions = bindState(actions(), state)


  return state
}

function actions () {
  return {
    move: function (state, direction) {
      state.list = e.move(direction, state.list)
      update()
    }
  }
}

function render (state) {
  var DOWN = 40
  var UP = 38

  function li (o) {
    return h('li', o.value + (o.highlighted ? ' *' : ''))
  }
  return h('div', [
    h('input', {
      type: 'text',
      name: 'foo',
      value: '',
      'ev-keydown': [
        sendKey(state.actions.move, 'down', { key: DOWN}),
        sendKey(state.actions.move, 'up', { key: UP })
      ]
    }),
    h('ul', state.list.map(li))
  ])
}