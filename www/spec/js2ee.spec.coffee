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

    make = (num) ->
      list.append({__POINTER__: i}) for i in [num..1]
      
    it "should have all the correct methods", () ->
      expect(js2ee.List).toBeDefined()
      expect(list).toBeDefined()
      expect(list.count).toBeDefined()
      expect(list.append).toBeDefined()
    
    it "should count new items", () ->
      expect(list.count()).toBe(0)
      make 1
      expect(list.count()).toBe(1)
      make 4
      expect(list.count()).toBe(5)

    it "should remove items", () ->
      list.removeFirst()
      expect(list.count()).toBe(4)
      list.removeLast()
      expect(list.count()).toBe(3)
      
    it "should get and remove a single item", () ->
      item = list.get(list.count() - 1)
      expect(item).toBeDefined()
      list.remove(item)
      expect(list.count()).toBe(2)
      list.removeAll()
      expect(list.count()).toBe(0)
      