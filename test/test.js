var LookupGrid = require('../')
var ndarray = require('ndarray')
var ArrayGrid = require('array-grid')

var test = require('tape')

test('lookup ndarray', function(t){
  var grid = LookupGrid(8, 8)

  var drums = ndarray(['a','b','c','d','e','f'], [2,3], [-3, -1])
  var synth = ndarray(['!','@','#','$','%','^'], [3,2], [-2, -1])
  var bass = ArrayGrid(['s', 't','u','v','w','x','y','z'], [4,2], [1, 4])

  grid.set(1,1, drums)
  grid.set(3,1, synth)
  grid.set(1,5, bass)

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

  grid.set(3,2, synth)
  t.equal(grid.get(5,3), '!')

  grid.remove(bass)
  t.equal(grid.get(1,5), null)
  t.equal(grid.get(3,5), null)
  t.equal(grid.get(1,6), null)
  t.equal(grid.get(4,6), null)


  t.end()
})

test('recursive lookup', function(t){
  var drums = ndarray(['a','b','c','d'], [2,2], [1, 2])
  var synth = ndarray(['e','f','g','h'], [2,2], [1, 2])

  var innerGrid = LookupGrid(4, 2)

  innerGrid.set(0,0, drums)
  innerGrid.set(2,0, synth)

  var outerGrid = LookupGrid(8, 8)
  outerGrid.set(3,2, innerGrid)

  t.equal(outerGrid.get(3,2), 'a')
  t.equal(outerGrid.get(4,2), 'b')
  t.equal(outerGrid.get(3,3), 'c')
  t.equal(outerGrid.get(4,3), 'd')
  t.equal(outerGrid.get(5,2), 'e')
  t.equal(outerGrid.get(6,2), 'f')
  t.equal(outerGrid.get(5,3), 'g')
  t.equal(outerGrid.get(6,3), 'h')

  t.same(outerGrid.lookup('d'), [4,3])
  t.same(outerGrid.lookup('g'), [5,3])

  t.end()
})