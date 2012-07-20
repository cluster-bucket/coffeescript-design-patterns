# The decorator pattern
# ---------------------
#
# > Creates pluggable filters to process common services in a standard manner 
# without requiring changes to core request processing code. The filters intercept 
# incoming requests and outgoing responses, allowing preprocessing and post-processing. 
# We are able to add and remove these filters unobtrusively, without requiring 
# changes to our existing code. ---[Intercepting Filter](http://java.sun.com/blueprints/corej2eepatterns/Patterns/InterceptingFilter.html) 
window.define = require("amdefine")(module) if typeof define isnt "function"
define [], () ->


  # Defines the interface.
  class Component
    props: {}
    add: (key, val) ->
      @props[key] = val
    get: () ->
      @props
    process: () ->

  # The ConcreteComponent is the object that gets decorated. For example, 
  # you want an object that represents a request (think PHP's $_REQUEST). 
  # Unfortunately Javascript doesn't have an object like that so we create
  # an empty request object that will get decorated with all the params from
  # the querystring. That empty request object is the ConcreteComponent.
  class ConcreteComponent extends Component
    process: () ->

  # Keeps a reference to the Component and defines a conforming interface
  class Decorator extends Component
    constructor: (@component) ->
    process: () ->
      @component.process()
  
  class ConcreteDecoratorA extends Decorator
    process: () ->
      @component.add "concreteDecoratorAProcess", true
      super()
  
  class ConcreteDecoratorB extends Decorator
    process: () ->
      @component.add "concreteDecoratorBProcess", true
      super()
  
  ###
  cmpt = new ConcreteDecoratorA new ConcreteDecoratorB new ConcreteComponent()
  cmpt.process()
  console.log cmpt.get()
 ​###
  
  decorator =
    ConcreteComponent: ConcreteComponent
    Component: Component
    Decorator: Decorator
    ConcreteDecoratorA: ConcreteDecoratorA
    ConcreteDecoratorB: ConcreteDecoratorB
