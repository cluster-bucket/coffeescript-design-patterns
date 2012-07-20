window.define = require("amdefine")(module) if typeof define isnt "function"
define ["cs!./iterator", "cs!./list"], (Iterator, List) ->
  
  # * Knows its obvservers. Any number of Observer objects may observe a subject
  # * Provides an interface for attaching and detaching Observer objects.
  class Subject
    constructor: () ->
      @observers = new List()
    attach: (o) ->
      @observers.append o
    detach: (o) ->
      @observers.remove o
    notify: () ->
      i = new Iterator @observers
      while i.hasNext()
        i.current().update @
        i.next()
      
  # * Defines an updating interface for objects that should be 
  #   notified of changes in a subject
  # * Sends a notification to its observers when its state changes.
  class Observer
    update: (theChangedSubject) ->

  # Stores state of interest to ConcreteObserver objects
  class ConcreteSubject extends Subject
    constructor: () ->
      setInterval () =>
        @notify()
      , 1500
  
  # * Maintains a reference to a ConcreteSubject object
  # * Stores state that should stay consistent with the subject's
  # * Implements the Observer updating interface to keep its state
  #   consistent with the subject's
  class ConcreteObserver extends Observer
    update: (theChangedSubject) ->
      console.log "Updated"
  
  subject = new ConcreteSubject()
  observer = new ConcreteObserver subject
  