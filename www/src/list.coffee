window.define = require("amdefine")(module) if typeof define isnt "function"
define [], () ->
  class List
    constructor: () ->
      @items = []
      @objects = {}
  
    # Returns the number of objects in the list
    count: () ->
      @items.length
  
    # Returns the object at the given length
    get: (index) ->
      @objects[index]
      
    # Returns the first object in the list
    first: () ->
      @objects[@items[0]]
  
    # Returns the last object in the list
    last: () ->
      @objects[@items[@items.length - 1]]
  
    # Adds the argument to the list, making it the last element
    append: (item) ->
      pointer = item.__POINTER__
      @items.push pointer
      @objects[pointer] = item
  
    # Adds the argument to the list, making it the first element
    prepend: (item) ->
  
    # Removes the given element from the list. This operation requires
    # that the type of elements in the list support the `is` operator
    # for comparison
    remove: (item) ->
  
    # Removes the last element from the list
    removeLast: () ->
  
    # Removes the first element from the list
    removeFirst: () ->
  
    # Removes all elements from the list
    removeAll: () ->
