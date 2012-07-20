window.define = require("amdefine")(module) if typeof define isnt "function"
define [], () ->
  
  # Defines the interface of objects the factory method creates, e.g. Document
  class Product
  
  # Declares the factory method, which returns an object of type Product.
  # Creator may also define a default implementation of the factory method 
  # that returns a default ConcreteProduct. It may call the factory method
  # to create a Product object. e.g. Application
  class Creator
    factoryMethod: () ->
    anOperation: () ->
      product = @factoryMethod()
  
  # Implements the Product interface, e.g. MyDocument
  class ConcreteProduct extends Product
  
  # Overrides the factory method to return an instance of ConcreteProduct.
  # e.g. MyApplication
  class ConcreteCreator extends Creator
    factoryMethod: () ->
      return new ConcreteProduct()
  
  class Client
    @run: ->
      creator = new ConcreteCreator()
      creator.anOperation()
  
  Client.run()