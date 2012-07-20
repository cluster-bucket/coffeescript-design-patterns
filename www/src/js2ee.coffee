window.define = require("amdefine")(module) if typeof define isnt "function"
define [
  "cs!./decorator"
  "cs!./command"
  "cs!./list"
  "cs!./iterator"
  "cs!./observer"
], (decorator, command, List, iterator, observer) ->
  
  decorator: decorator
  command: command
  iterator: iterator
  observer: observer
  List: List 