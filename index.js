module.exports = LookupGrid

function LookupGrid(width, height){

  if (!(this instanceof LookupGrid)){
    return new LookupGrid(width, height)
  }

  this.shape = [width, height]
  this.stride = [height, 1]
  this.offset = 0
  this._arrays = []
  this._origins = []
}

LookupGrid.prototype = {
  constructor: LookupGrid,

  set: function(x, y, array){
    var index = this._arrays.indexOf(array)
    if (~index){
      this._origins[index] = [x||0,y||0]
    } else {
      this._arrays.push(array)
      this._origins.push([x||0,y||0])
    }
  },

  remove: function(array){
    var index = this._arrays.indexOf(array)
    if (~index){
      this._arrays.splice(index, 1)
      this._origins.splice(index, 1)
    }
  },

  index: function(x, y){
    return this.offset + (this.stride[0] * x) + (this.stride[1] * y)
  },

  get: function(x, y){
    var result = null
    for (var i=this._arrays.length-1;i>=0;i--){
      var array = this._arrays[i]
      var offset = this._origins[i]
      var pos = [x - offset[0], y - offset[1]]
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