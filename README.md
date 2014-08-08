lookup-grid
===

Position [two-dimensional](https://github.com/mmckegg/array-grid) [ndarrays](https://github.com/mikolalysenko/ndarray) on an row/col grid for lookup of individual coords and values.

## Install via [npm](http://npmjs.com/packages/lookup-grid)

```bash
$ npm install lookup-grid
```

## API

```js
var LookupGrid = require('lookup-grid')
var grid = LookupGrid(8,8)
```

### LookupGrid(rows, cols)

Create an instance with the specified shape as per `rows` and `cols`.

### grid.set(row, col, array)

Place a 2 dimensional array ([ndarray](https://github.com/mikolalysenko/ndarray) or [array-grid](https://github.com/mmckegg/array-grid)) at origin `[row, col]`.

If the same array (by ref) is placed multiple times, this moves the array instead of placing additional copies.

### grid.remove(array)

Remove an array by ref from the grid.

### grid.get(row,col)

Resolve the inner array and return the top most value at point `[row, col]`.

### grid.lookup(value)

Return the `[row,col]` coordinates of the specified value using the origins supplied for the inner arrays.

## Example

```js
var ndarray = require('ndarray')
var ArrayGrid = require('array-grid') // same API as ndarray but fixed at 2d

var LookupGrid = require('lookup-grid')

var grid = LookupGrid(8, 8)

var drums = ndarray(['a','b','c','d','e','f'], [3,2])
console.log(displayGrid(drums))
//|---|---|
//| a | b |
//|---|---|
//| c | d |
//|---|---|
//| e | f |
//|---|---|


var synth = ndarray(['h','i','j','k','l','m'], [2,3], [-3, 1])
console.log(displayGrid(synth))
//|---|---|---|
//| k | l | m |
//|---|---|---|
//| h | i | j |
//|---|---|---|

var bass = ndarray(['s', 't','u','v','w','x','y','z'], [2,4], [1, 2]) // col major
console.log(displayGrid(bass))
//|---|---|---|---|
//| s | u | w | y |
//|---|---|---|---|
//| t | v | x | z |
//|---|---|---|---|

grid.set(0, 0, drums)
grid.set(0, 3, synth)
grid.set(4, 2, bass)

console.log([0,0], grid.get(0,0)) //= 'a'
console.log([0,1], grid.get(0,1)) //= 'd'

console.log('a', grid.lookup('a')) //= [0,0]
console.log('d', grid.lookup('d')) //= [0,1]
console.log('y', grid.lookup('y')) //= [7,3]

console.log(displayGrid(grid))
//|---|---|---|---|---|---|---|---|
//| a | b |   | k | l | m |   |   |
//|---|---|---|---|---|---|---|---|
//| c | d |   | h | i | j |   |   |
//|---|---|---|---|---|---|---|---|
//| e | f |   |   |   |   |   |   |
//|---|---|---|---|---|---|---|---|
//|   |   |   |   |   |   |   |   |
//|---|---|---|---|---|---|---|---|
//|   |   | s | u | w | y |   |   |
//|---|---|---|---|---|---|---|---|
//|   |   | t | v | x | z |   |   |
//|---|---|---|---|---|---|---|---|
//|   |   |   |   |   |   |   |   |
//|---|---|---|---|---|---|---|---|
//|   |   |   |   |   |   |   |   |
//|---|---|---|---|---|---|---|---|


// move the drums across
grid.set(0, 1, drums)
console.log(displayGrid(grid))
//|---|---|---|---|---|---|---|---|
//|   | a | b | k | l | m |   |   |
//|---|---|---|---|---|---|---|---|
//|   | c | d | h | i | j |   |   |
//|---|---|---|---|---|---|---|---|
//|   | e | f |   |   |   |   |   |
//|---|---|---|---|---|---|---|---|
//|   |   |   |   |   |   |   |   |
//|---|---|---|---|---|---|---|---|
//|   |   | s | u | w | y |   |   |
//|---|---|---|---|---|---|---|---|
//|   |   | t | v | x | z |   |   |
//|---|---|---|---|---|---|---|---|
//|   |   |   |   |   |   |   |   |
//|---|---|---|---|---|---|---|---|
//|   |   |   |   |   |   |   |   |
//|---|---|---|---|---|---|---|---|


// remove the synth
grid.remove(synth)
console.log(displayGrid(grid))
//|---|---|---|---|---|---|---|---|
//|   | a | b |   |   |   |   |   |
//|---|---|---|---|---|---|---|---|
//|   | c | d |   |   |   |   |   |
//|---|---|---|---|---|---|---|---|
//|   | e | f |   |   |   |   |   |
//|---|---|---|---|---|---|---|---|
//|   |   |   |   |   |   |   |   |
//|---|---|---|---|---|---|---|---|
//|   |   | s | u | w | y |   |   |
//|---|---|---|---|---|---|---|---|
//|   |   | t | v | x | z |   |   |
//|---|---|---|---|---|---|---|---|
//|   |   |   |   |   |   |   |   |
//|---|---|---|---|---|---|---|---|
//|   |   |   |   |   |   |   |   |
//|---|---|---|---|---|---|---|---|

// update inner array
drums.set(0,0, '%')
drums.set(1,2, '$')
console.log(displayGrid(grid))
//|---|---|---|---|---|---|---|---|
//|   | % | b |   |   |   |   |   |
//|---|---|---|---|---|---|---|---|
//|   | c | d |   |   |   |   |   |
//|---|---|---|---|---|---|---|---|
//|   | $ | f |   |   |   |   |   |
//|---|---|---|---|---|---|---|---|
//|   |   |   |   |   |   |   |   |
//|---|---|---|---|---|---|---|---|
//|   |   | s | u | w | y |   |   |
//|---|---|---|---|---|---|---|---|
//|   |   | t | v | x | z |   |   |
//|---|---|---|---|---|---|---|---|
//|   |   |   |   |   |   |   |   |
//|---|---|---|---|---|---|---|---|
//|   |   |   |   |   |   |   |   |
//|---|---|---|---|---|---|---|---|

//// RECURSIVE

var drums = ndarray(['a','b','c','d'], [2,2], [2, 1])
var synth = ndarray(['e','f','g','h'], [2,2], [2, 1])

var innerGrid = LookupGrid(2, 4)

innerGrid.set(0,0, drums)
innerGrid.set(0,2, synth)

console.log(displayGrid(innerGrid))

var outerGrid = LookupGrid(8, 8)
outerGrid.set(2,3, innerGrid)

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