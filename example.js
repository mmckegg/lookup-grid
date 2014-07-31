var LookupGrid = require('./')
var grid = LookupGrid(8, 8)

var ndarray = require('ndarray')

var drums = ndarray(['a','b','c','d','e','f'], [2,3], [-3, -1])
var synth = ndarray(['!','@','#','$','%','^'], [3,2], [-2, -1])
var bass = ndarray(['s', 't','u','v','w','x','y','z'], [4,2], [1, 4])

grid.set('drums', drums, [1,1])
grid.set('synth', synth, [3,1])
grid.set('bass', bass, [1,5])

console.log(grid.get(1,1), '= f')
console.log(grid.get(5,2), '= !')

console.log(grid.lookup('a'), '= 2,3')

console.log(displayGrid(grid))


function displayGrid(input){
  var rows = require('ndarray-unpack')(ndarray(input._grid.data, [8,8], [1,8]))
  return '|-------------------------------|\n' + rows.map(function(columns, i){
    return '| ' + columns.map(function(item){
      return item || ' '
    }).join(' | ') + ' |'
  }).join('\n|-------------------------------|\n') +  '\n|-------------------------------|'
}