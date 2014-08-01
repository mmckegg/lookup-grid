var ndarray = require('ndarray')

module.exports = LookupGrid

function LookupGrid(width, height){

  if (!(this instanceof LookupGrid)){
    return new LookupGrid(width, height)
  }

  this.data = []
  this.shape = [width, height]
  this._arrayLookup = {}
  this._coordsLookup = {}
  this._grid = ndarray(this.data, this.shape)
}

LookupGrid.prototype = {
  
  set: function(key, array, origin){
    this.remove(key)
    this._arrayLookup[key] = array
    for (var x=0;x<array.shape[0];x++){
      for (var y=0;y<array.shape[1];y++){
        var coords = [x+(origin[0]||0),y+(origin[1]||0)]
        var value = array.get(x,y)
        this._grid.set(coords[0], coords[1], value)
        this._coordsLookup[value] = coords
      }
    }
  },

  move: function(key, origin){
    if (this._arrayLookup[key]){
      this.set(key, this._arrayLookup[key], origin)
    }
  },

  remove: function(key){
    var array = this._arrayLookup[key]
    if (array){
      var ids = array.data
      for (var i=0;i<ids.length;i++){
        var id = ids[i]
        var coords = this._coordsLookup[id]
        if (coords){
          this._grid.set(coords[0], coords[1], null)
        }
        this._coordsLookup[id] = null
      }
      this._arrayLookup[key] = null
    }
  },

  get: function(x, y){
    return this._grid.get(x,y)
  },

  lookup: function(id){
    return this._coordsLookup[id]
  }
}