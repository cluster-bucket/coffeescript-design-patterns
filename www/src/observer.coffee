window.define = require("amdefine")(module) if typeof define isnt "function"
define ["cs!./iterator", "cs!./list"], (Iterator, List) ->
  
  # * Knows its obvservers. Any number of Observer objects may observe a subject
  # * Provides an interface for attaching and detaching Observer objects.
  class Subject
    constructor: () ->
      @counter = 0
      @observers = new List()
    attach: (o) ->
      o.__POINTER__ = @counter
      @observers.append o
      @counter += 1
    detach: (o) ->
      @observers.remove o
    notify: () ->
      i = new Iterator.ConcreteIterator @observers
      while not i.isDone()
        i.currentItem().update @
        i.next()
      
  # * Defines an updating interface for objects that should be 
  #   notified of changes in a subject
  # * Sends a notification to its observers when its state changes.
  class Observer
    update: (theChangedSubject) ->

  # Stores state of interest to ConcreteObserver objects
  class ConcreteSubject extends Subject

    ###
    constructor: () ->
      super()
      setInterval () =>
        @notify()
      , 1500
    ###
  
  # * Maintains a reference to a ConcreteSubject object
  # * Stores state that should stay consistent with the subject's
  # * Implements the Observer updating interface to keep its state
  #   consistent with the subject's
  class ConcreteObserver extends Observer
    update: (theChangedSubject) ->
      console.log "Updated"
  
  observer =
    ConcreteSubject: ConcreteSubject
    ConcreteObserver: ConcreteObserver
  