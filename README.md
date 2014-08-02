lookup-grid
===

Position [two-dimensional](https://github.com/mmckegg/array-grid) [ndarrays](https://github.com/mikolalysenko/ndarray) on an x/y grid for lookup of individual coords and values.

## Install via [npm](http://npmjs.com/packages/lookup-grid)

```bash
$ npm install lookup-grid
```

## API

```js
var LookupGrid = require('lookup-grid')
var grid = LookupGrid(8,8)
```

### LookupGrid(width, height)

Create an instance with the specified shape as per `width` and `height`.

### grid.set(x, y, array)

Place a 2 dimensional array ([ndarray](https://github.com/mikolalysenko/ndarray) or [array-grid](https://github.com/mmckegg/array-grid)) at origin `[x, y]`.

If the same array (by ref) is placed multiple times, this moves the array instead of placing additional copies.

### grid.remove(array)

Remove an array by ref from the grid.

### grid.get(x,y)

Resolve the inner array and return the top most value at point `[x, y]`.

### grid.lookup(value)

Return the `[x,y]` coordinates of the specified value using the origins supplied for the inner arrays.

## Example

```js
var ndarray = require('ndarray')
var ArrayGrid = require('array-grid') // same API as ndarray but fixed at 2d

var LookupGrid = require('lookup-grid')

var grid = LookupGrid(8, 8)

var drums = ndarray(['a','b','c','d','e','f'], [2,3])
// a d 
// b e 
// c f

var synth = ndarray(['h','i','j','k','l','m'], [3,2], [1, -3])
// k l m 
// h i j

var bass = ArrayGrid(['s', 't','u','v','w','x','y','z'], [4,2], [1, 4])
// s t u v
// w x y z

grid.set(0, 0, drums)
grid.set(3, 0, synth)
grid.set(2, 4, bass)

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

grid.get(0,0) //= 'a'
grid.get(1,0) //= 'd'

grid.lookup('a') //= [0,0]
grid.lookup('d') //= [1,0]
grid.lookup('y') //= [3,7]


// move the drums across
grid.set(1, 0, drums)

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

```

### Recursive Usage

The lookup-grid itself can be placed on another lookup-grid and perform lookups recursively.

```js
var drums = ndarray(['a','b','c','d'], [2,2], [1, 2])
var synth = ndarray(['e','f','g','h'], [2,2], [1, 2])

var innerGrid = LookupGrid(4, 2)

innerGrid.set(0,0, drums)
innerGrid.set(2,0, synth)

console.log(displayGrid(innerGrid))

var outerGrid = LookupGrid(8, 8)
outerGrid.set(3,2, innerGrid)

console.log(displayGrid(outerGrid))

//|---|---|---|---|---|---|---|---|
//|   |   |   |   |   |   |   |   |
//|---|---|---|---|---|---|---|---|
//|   |   |   |   |   |   |   |   |
//|---|---|---|---|---|---|---|---|
//|   |   |   | a | b | e | f |   |
//|---|---|---|---|---|---|---|---|
//|   |   |   | c | d | g | h |   |
//|---|---|---|---|---|---|---|---|
//|   |   |   |   |   |   |   |   |
//|---|---|---|---|---|---|---|---|
//|   |   |   |   |   |   |   |   |
//|---|---|---|---|---|---|---|---|
//|   |   |   |   |   |   |   |   |
//|---|---|---|---|---|---|---|---|
//|   |   |   |   |   |   |   |   |
//|---|---|---|---|---|---|---|---|
```