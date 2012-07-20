window.define = require("amdefine")(module) if typeof define isnt "function"
define [], () ->
  
  # [How to create coffeescript singleton subclass](http://stackoverflow.com/questions/10142413/how-to-create-coffeescript-singleton-subclass)  
  
  class Singleton
    @_instance: null
    @getInstance: ->
      @_instance ||= new @( arguments... )
      
  # Usage: Call Registry.getInstance(), then use the object to call set/get
  class Registry extends Singleton
    properties: {}
    constructor: () ->
    set: (key, val) ->
      @properties[key] = val
      return
    get: (key) ->
      @properties[key]

  registry = Registry.getInstance()
  registry.set "ohai", "world"
  console.log registry.get "ohai"