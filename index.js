module.exports = LookupGrid

function LookupGrid(rows, cols){

  if (!(this instanceof LookupGrid)){
    return new LookupGrid(rows, cols)
  }

  this.shape = [rows, cols]
  this.stride = [cols, 1]
  this.offset = 0
  this._arrays = []
  this._origins = []
}

LookupGrid.prototype = {
  constructor: LookupGrid,

  set: function(row, col, array){
    var index = this._arrays.indexOf(array)
    if (~index){
      this._origins[index] = [row||0,col||0]
    } else {
      this._arrays.push(array)
      this._origins.push([row||0,col||0])
    }
  },

  remove: function(array){
    var index = this._arrays.indexOf(array)
    if (~index){
      this._arrays.splice(index, 1)
      this._origins.splice(index, 1)
    }
  },

  index: function(row, col){
    return this.offset + (this.stride[0] * row) + (this.stride[1] * col)
  },

  get: function(row, col){
    var result = null
    for (var i=this._arrays.length-1;i>=0;i--){
      var array = this._arrays[i]
      var offset = this._origins[i]
      var pos = [row - offset[0], col - offset[1]]
      if (pos[0] >= 0 && pos[1] >= 0 && pos[0] < array.shape[0] && pos[1] < array.shape[1]){
        result = array.get(pos[0], pos[1])
        if (result != null){
          break
        }
      }
    }
    return result
  },

  lookup: function(value){
    var result = null
    for (var i=this._arrays.length-1;i>=0;i--){
      var array = this._arrays[i]
      var offset = this._origins[i]

      result = getCoords(array, offset, value)

      if (result != null){
        break
      }
    }
    return result
  }

}

function getCoords(array, offset, value){
  if (array.lookup){
    var result = array.lookup(value)
    if (result){
      return [
        result[0] + offset[0],
        result[1] + offset[1]
      ]
    }
  } else if (array.data && array.stride){
    var index = array.data.indexOf(value)
    if (~index){
      index = index - array.offset
      return [
        Math.floor(index / array.stride[0]) % array.shape[0] + offset[0],
        Math.floor(index / array.stride[1]) % array.shape[1] + offset[1]
      ]
    }
  }
}