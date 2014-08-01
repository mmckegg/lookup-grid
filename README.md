lookup-grid
===

Position named two-dimensional [ndarrays](https://github.com/mikolalysenko/ndarray) on an x/y grid for lookup of individual coords and values.

## Install via [npm](http://npmjs.com/packages/lookup-grid)

```bash
$ npm install lookup-grid
```

## Example

```js
var ndarray = require('ndarray')
var LookupGrid = require('lookup-grid')

var grid = LookupGrid(8, 8)

var drums = ndarray(['a','b','c','d','e','f'], [2,3])
// a d 
// b e 
// c f

var synth = ndarray(['h','i','j','k','l','m'], [3,2], [1, -3])
// k l m 
// h i j

var bass = ndarray(['s', 't','u','v','w','x','y','z'], [4,2], [1, 4])
// s t u v
// w x y z

grid.set('drums', drums, [0,0])
grid.set('synth', synth, [3,0])
grid.set('bass', bass, [2,4])

grid.get(0,0) //= 'a'
grid.get(1,0) //= 'd'

grid.lookup('a') //= [0,0]
grid.lookup('d') //= [1,0]
grid.lookup('y') //= [3,7]

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
// or
grid.move('drums', [1,0])

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

```