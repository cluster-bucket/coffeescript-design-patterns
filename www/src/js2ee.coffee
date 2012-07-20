window.define = require("amdefine")(module) if typeof define isnt "function"
define [
  "cs!./decorator"
  "cs!./command"
  "cs!./list"
], (decorator, command, List) ->
  
  decorator: decorator
  command: command
  List: List
 