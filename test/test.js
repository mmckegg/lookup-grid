var LookupGrid = require('../')
var ndarray = require('ndarray')

require('tape')(function(t){
  var grid = LookupGrid(8, 8)

  var drums = ndarray(['a','b','c','d','e','f'], [2,3], [-3, -1])
  var synth = ndarray(['!','@','#','$','%','^'], [3,2], [-2, -1])
  var bass = ndarray(['s', 't','u','v','w','x','y','z'], [4,2], [1, 4])


  grid.set('drums', drums, [1,1])
  grid.set('synth', synth, [3,1])
  grid.set('bass', bass, [1,5])

  t.equal(grid.get(1,1), 'f')
  t.equal(grid.get(1,3), 'd')
  t.equal(grid.get(2,2), 'b')
  t.equal(grid.get(2,3), 'a')

  t.equal(grid.get(1,5), 's')
  t.equal(grid.get(3,5), 'u')
  t.equal(grid.get(1,6), 'w')
  t.equal(grid.get(4,6), 'z')

  t.equal(grid.get(5,2), '!')

  t.deepEqual(grid.lookup('a'), [2,3])
  t.deepEqual(grid.lookup('b'), [2,2])
  t.deepEqual(grid.lookup('w'), [1,6])
  t.deepEqual(grid.lookup('^'), [3,1])

  grid.move('synth', [3,2])
  t.equal(grid.get(5,3), '!')

  grid.remove('bass')
  t.equal(grid.get(1,5), null)
  t.equal(grid.get(3,5), null)
  t.equal(grid.get(1,6), null)
  t.equal(grid.get(4,6), null)


  t.end()
})