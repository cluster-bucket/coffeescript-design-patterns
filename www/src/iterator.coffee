# Iterator
window.define = require("amdefine")(module) if typeof define isnt "function"
define ["cs!./list"], (List) ->

  # Defines an interface for accessing and traversing elements.
  class Iterator
    first: () ->
    next: () ->
    isDone: () ->
    currentItem: () ->
  
  # * Implements the Iterator interface
  # * Keeps track of the current position in the traversal
  #   of the aggregate
  class ConcreteIterator extends Iterator
    constructor: (@list) ->
      @current = 0
    first: () ->
      @current = 0
    next: () ->
      @current += 1
    isDone: () ->
      @current >= @list.count()
    currentItem: () ->
      throw new Error "IteratorOutOfBounds" if @isDone()
      @list.get @current
      
  # Defines an interface for creating an Iterator object
  class Aggregate
    createIterator: () ->
  
  # Implements the Iterator creation interface to return an
  # instance of the proper ConcreteIterator
  class ConcreteAggregate extends Aggregate
    createIterator: (items) ->
      list = new List()
      # count = 0
      
      for key, val of items
        val.__POINTER__ = key # count
        list.append val
        # count += 1
        
      new ConcreteIterator list

  iterator =
    ConcreteIterator: ConcreteIterator
    ConcreteAggregate: ConcreteAggregate


  ###
  class ListIterator extends Iterator
    constructor: (@list) ->
      @current = 0
    first: () ->
      @current = 0
    next: () ->
      @current += 1
    isDone: () ->
      @current >= @list.count()
    currentItem: () ->
      throw new Error "IteratorOutOfBounds" if @isDone()
      @list.get @current
  ###

  ###
  class Iterator
    constructor: () ->
      @index = 0
      @keys = []

    next: () ->
      throw new Error "StopIteration" if @index >= @keys.length
      @index += 1
      # @bindings[@keys[@index]]

    rewind: () ->
      @index = 0

    current: () ->
      @bindings[@keys[@index]]

    key: () ->
      @keys[@index]

    hasNext: () ->
      @index < @keys.length  
  ###