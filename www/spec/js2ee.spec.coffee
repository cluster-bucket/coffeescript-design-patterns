window.define = require("amdefine")(module) if typeof define isnt "function"
define [
  "cs!../src/js2ee"  
], (js2ee) ->
  
  describe "JS2EE", () ->
    it "Should load the module", () ->
      expect(js2ee).toBeDefined()

  describe "decorator", () ->
    it "All decorator classes are defined", () ->
      expect(js2ee.decorator).toBeDefined()
      expect(js2ee.decorator.ConcreteComponent).toBeDefined()
      expect(js2ee.decorator.Component).toBeDefined()
      expect(js2ee.decorator.Decorator).toBeDefined()
      expect(js2ee.decorator.ConcreteDecoratorA).toBeDefined()
      expect(js2ee.decorator.ConcreteDecoratorB).toBeDefined()
      
    it "ConcreteComponent is decorated", () ->
      d = js2ee.decorator
      cmpt = new d.ConcreteDecoratorA new d.ConcreteDecoratorB new d.ConcreteComponent()
      expect(cmpt.get()).toEqual({})
      cmpt.process()
      props = cmpt.get()    
      expect(props.concreteDecoratorAProcess).toBeDefined()
      expect(props.concreteDecoratorBProcess).toBeDefined()
      
  describe "List", () ->
    list = new js2ee.List()
    it "should have all the correct methods", () ->
      expect(js2ee.List).toBeDefined()
    
    it "should count new items", () ->
      expect(list.count()).toBe(0)
      