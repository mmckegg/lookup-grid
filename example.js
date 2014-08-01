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

grid.set('drums', drums, [0,0])
grid.set('synth', synth, [3,0])
grid.set('bass', bass, [2,4])

console.log([0,0], grid.get(0,0)) //= 'a'
console.log([1,0], grid.get(1,0)) //= 'd'

console.log('a', grid.lookup('a')) //= [0,0]
console.log('d', grid.lookup('d')) //= [1,0]
console.log('y', grid.lookup('y')) //= [3,7]

console.log(displayGrid(grid))

// current grid
//          <-- x -->
// |---|---|---|---|---|---|---| 
// | a | d |   |   | k | l | m |
// |---|---|---|---|---|---|---|     
// | b | e |   |   | h | i | j | 
// |---|---|---|---|---|---|---| ^   
// | c | f |   |   |   |   |   | |
// |---|---|---|---|---|---|---| y           
// |   |   |   |   |   |   |   | |
// |---|---|---|---|---|---|---| v               
// |   | s | t | u | v |   |   |
// |---|---|---|---|---|---|---|    
// |   | w | x | y | z |   |   |
// |---|---|---|---|---|---|---|



// move the drums across
grid.set('drums', drums, [1,0])
console.log(displayGrid(grid))

//          <-- x -->
// |---|---|---|---|---|---|---| 
// |   | a | d |   | k | l | m |
// |---|---|---|---|---|---|---|     
// |   | b | e |   | h | i | j | 
// |---|---|---|---|---|---|---| ^   
// |   | c | f |   |   |   |   | |
// |---|---|---|---|---|---|---| y           
// |   |   |   |   |   |   |   | |
// |---|---|---|---|---|---|---| v               
// |   | s | t | u | v |   |   |
// |---|---|---|---|---|---|---|    
// |   | w | x | y | z |   |   |
// |---|---|---|---|---|---|---|



// remove the synth
grid.remove('synth')
console.log(displayGrid(grid))

//          <-- x -->
// |---|---|---|---|---|---|---| 
// |   | a | d |   |   |   |   |
// |---|---|---|---|---|---|---|     
// |   | b | e |   |   |   |   | 
// |---|---|---|---|---|---|---| ^   
// |   | c | f |   |   |   |   | |
// |---|---|---|---|---|---|---| y           
// |   |   |   |   |   |   |   | |
// |---|---|---|---|---|---|---| v               
// |   | s | t | u | v |   |   |
// |---|---|---|---|---|---|---|    
// |   | w | x | y | z |   |   |
// |---|---|---|---|---|---|---|


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