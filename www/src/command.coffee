window.define = require("amdefine")(module) if typeof define isnt "function"
define [], () ->
  # Declares an interface for executing an operation
  class Command
    execute: () ->
  
  # Asks the command to carry out the request
  class Invoker
    execute: (command) ->
      command.execute()
  
  # Knows how to perform the operations associated with carrying out a request. Any class may serve as a Receiver.
  class Receiver
    action1: () -> console.log "action1"
    action2: () -> console.log "action2"
  
  # * Defines a binding between a receiver object and an action
  # * Implements execute() by invoking the corresponding operation(s) on Receiver
  class ConcreteCommandA extends Command
    constructor: (@receiver) ->
    execute: () ->
      @receiver.action1()
  
  class ConcreteCommandB extends Command
    constructor: (@receiver) ->
    execute: () ->
      @receiver.action2()
  
  # Creates a ConcreteCommand object and sets its Receiver
  class Client
    @run: (action) ->
      receiver = new Receiver()
      ccmdA = new ConcreteCommandA receiver
      ccmdB = new ConcreteCommandB receiver
      invoker = new Invoker()
      invoker.execute ccmdA if action is 1
      invoker.execute ccmdB if action is 2
  
  # Client.run 1
  # Client.run 2
  
  facade =
    Client: Client