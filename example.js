var LookupGrid = require('./')
var ndarray = require('ndarray')

var grid = LookupGrid(8, 8)

var drums = ndarray(['a','b','c','d','e','f'], [2,3])
console.log(displayGrid(drums))
// a d 
// b e 
// c f

var synth = ndarray(['h','i','j','k','l','m'], [3,2], [1, -3])
console.log(displayGrid(synth))
// k l m 
// h i j

var bass = ndarray(['s', 't','u','v','w','x','y','z'], [4,2], [1, 4])
console.log(displayGrid(bass))
// s t u v
// w x y z

grid.set(0, 0, drums)
grid.set(3, 0, synth)
grid.set(2, 4, bass)

console.log([0,0], grid.get(0,0)) //= 'a'
console.log([1,0], grid.get(1,0)) //= 'd'

console.log('a', grid.lookup('a')) //= [0,0]
console.log('d', grid.lookup('d')) //= [1,0]
console.log('y', grid.lookup('y')) //= [3,7]

console.log(displayGrid(grid))

// current grid
//            <-- x -->
// |---|---|---|---|---|---|---|---| 
// | a | d |   |   | k | l | m |   |
// |---|---|---|---|---|---|---|---|     
// | b | e |   |   | h | i | j |   | 
// |---|---|---|---|---|---|---|---| ^   
// | c | f |   |   |   |   |   |   | |
// |---|---|---|---|---|---|---|---| y           
// |   |   |   |   |   |   |   |   | |
// |---|---|---|---|---|---|---|---| v               
// |   |   | s | t | u | v |   |   |
// |---|---|---|---|---|---|---|---|    
// |   |   | w | x | y | z |   |   |
// |---|---|---|---|---|---|---|---|
// |   |   |   |   |   |   |   |   |
// |---|---|---|---|---|---|---|---|
// |   |   |   |   |   |   |   |   |
// |---|---|---|---|---|---|---|---|


// move the drums across
grid.set(1, 0, drums)
console.log(displayGrid(grid))

// |---|---|---|---|---|---|---|---| 
// |   | a | d |   | k | l | m |   |
// |---|---|---|---|---|---|---|---|  
// |   | b | e |   | h | i | j |   |
// |---|---|---|---|---|---|---|---|  
// |   | c | f |   |   |   |   |   |
// |---|---|---|---|---|---|---|---|
// |   |   |   |   |   |   |   |   |
// |---|---|---|---|---|---|---|---|
// |   |   | s | t | u | v |   |   |
// |---|---|---|---|---|---|---|---|
// |   |   | w | x | y | z |   |   |
// |---|---|---|---|---|---|---|---|
// |   |   |   |   |   |   |   |   |
// |---|---|---|---|---|---|---|---|
// |   |   |   |   |   |   |   |   |
// |---|---|---|---|---|---|---|---|


// remove the synth
grid.remove(synth)
console.log(displayGrid(grid))

// |---|---|---|---|---|---|---|---|
// |   | a | d |   |   |   |   |   |
// |---|---|---|---|---|---|---|---| 
// |   | b | e |   |   |   |   |   |
// |---|---|---|---|---|---|---|---| 
// |   | c | f |   |   |   |   |   |
// |---|---|---|---|---|---|---|---| 
// |   |   |   |   |   |   |   |   |
// |---|---|---|---|---|---|---|---| 
// |   |   | s | t | u | v |   |   |
// |---|---|---|---|---|---|---|---|
// |   |   | w | x | y | z |   |   |
// |---|---|---|---|---|---|---|---|
// |   |   |   |   |   |   |   |   |
// |---|---|---|---|---|---|---|---|
// |   |   |   |   |   |   |   |   |
// |---|---|---|---|---|---|---|---|

// update inner array
drums.set(0,0, '%')
drums.set(1,2, '$')
console.log(displayGrid(grid))

// |---|---|---|---|---|---|---|---|
// |   | % | d |   |   |   |   |   |
// |---|---|---|---|---|---|---|---|
// |   | b | e |   |   |   |   |   |
// |---|---|---|---|---|---|---|---|
// |   | c | $ |   |   |   |   |   |
// |---|---|---|---|---|---|---|---|
// |   |   |   |   |   |   |   |   |
// |---|---|---|---|---|---|---|---|
// |   |   | s | t | u | v |   |   |
// |---|---|---|---|---|---|---|---|
// |   |   | w | x | y | z |   |   |
// |---|---|---|---|---|---|---|---|
// |   |   |   |   |   |   |   |   |
// |---|---|---|---|---|---|---|---|
// |   |   |   |   |   |   |   |   |
// |---|---|---|---|---|---|---|---|

//// RECURSIVE

var drums = ndarray(['a','b','c','d'], [2,2], [1, 2])
var synth = ndarray(['e','f','g','h'], [2,2], [1, 2])

var innerGrid = LookupGrid(4, 2)

innerGrid.set(0,0, drums)
innerGrid.set(2,0, synth)

console.log(displayGrid(innerGrid))

var outerGrid = LookupGrid(8, 8)
outerGrid.set(3,2, innerGrid)

console.log(displayGrid(outerGrid))

function displayGrid(input){
  var spacer = '|'
  for (var i=0;i<input.shape[0];i++){
    spacer += '---|'
  }
  var result = spacer
  for (var y=0;y<input.shape[1];y++){
    result += '\n|'
    for (var x=0;x<input.shape[0];x++){
      result += ' ' + (input.get(x, y) || ' ') + ' |'
    }
    result += '\n' + spacer
  }
  return result + '\n'
}