var ndarray = require('ndarray')

module.exports = LookupGrid

function LookupGrid(width, height){

  if (!(this instanceof LookupGrid)){
    return new LookupGrid(width, height)
  }

  this.data = []
  this._shape = [width, height]
  this._idsLookup = {}
  this._coordsLookup = {}
  this._grid = ndarray(this.data, this._shape)
}

LookupGrid.prototype = {
  
  set: function(key, array, origin){
    this.remove(key)
    this._idsLookup[key] = array.data
    for (var x=0;x<array.shape[0];x++){
      for (var y=0;y<array.shape[1];y++){
        var coords = [x+origin[0],y+origin[1]]
        var value = array.get(x,y)
        this._grid.set(coords[0], coords[1], value)
        this._coordsLookup[value] = coords
      }
    }
  },

  remove: function(key){
    var ids = this._idsLookup[key]
    if (ids){
      for (var i=0;i<ids.length;i++){
        var id = ids[i]
        var coords = this._coordsLookup[id]
        if (coords){
          this._grid.set(coords[0], coords[1], null)
        }
        this._coordsLookup[id] = null
      }
      this._idsLookup[key] = null
    }
  },

  get: function(x, y){
    return this._grid.get(x,y)
  },

  lookup: function(id){
    return this._coordsLookup[id]
  }
}