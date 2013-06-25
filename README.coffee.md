CoffeeScript Design Patterns
================================================================================

Ports of Gang of Four design patterns in CoffeeScript. 

* [Creational Patterns](#creational-patterns)
  * [Abstract Factory](#abstract-factory)
  * [Builder](#builder)
  * [Factory Method](#factory-method)
  * [Prototype](#prototype)
  * [Singleton](#singleton)
* [Structural Patterns](#structural-patterns)
  * [Adapter](#adapter)
  * [Bridge](#bridge)
  * [Composite](#composite)
  * [Decorator](#decorator)
  * [Façade](#façade)
  * [Flyweight](#flyweight)\*
  * [Proxy](#proxy)\*
* [Behavioral Patterns](#behavioral-patterns)
  * [Chain of Responsibility](#chain-of-responsibility)\*
  * [Command](#command)
  * [Interpreter](#interpreter)
  * [Iterator](#iterator)
  * [Mediator](#mediator)
  * [Memento](#memento)\*
  * [Observer](#observer)
  * [State](#state)\*
  * [Strategy](#strategy)
  * [Template Method](#template-method)
  * [Visitor](#visitor)\*
* [Foundational Classes](#foundational-classes)
  * [List Class](#list-class)

\* Unfinished pattern

Creational Patterns
================================================================================

Abstract Factory
--------------------------------------------------------------------------------

    do ->
      class AbstractProductA
        constructor: (arg) ->
          console.log arg

      class AbstractProductB
        constructor: (arg) ->
          console.log arg

      class ConcreteProductA1 extends AbstractProductA
      class ConcreteProductA2 extends AbstractProductA
      class ConcreteProductB1 extends AbstractProductB
      class ConcreteProductB2 extends AbstractProductB

      class AbstractFactory
        createProductA: () ->
        createProductB: () ->

      class ConcreteFactory1 extends AbstractFactory
        createProductA: () ->
          new ConcreteProductA1 "ConcreteProductA1"
        createProductB: () ->
          new ConcreteProductB1 "ConcreteProductB1"

      class ConcreteFactory2 extends AbstractFactory
        createProductA: () ->
          new ConcreteProductA2 "ConcreteProductA2"
        createProductB: () ->
          new ConcreteProductB2 "ConcreteProductB2"

      class Client
        constructor: (factory) ->
          @abstractProductA = factory.createProductA()
          @abstractProductB = factory.createProductB()

      class Example
        @run: () ->
          factory1 = new ConcreteFactory1()
          client1 = new Client factory1
          factory2 = new ConcreteFactory2()
          client2 = new Client factory2

      Example.run()

Builder
--------------------------------------------------------------------------------

    do ->
      class Director
        constructor: (@builder) ->
        construct: (structure) ->
          for obj in structure
            console.log obj
            @builder.buildPart obj
          return

      class Product
        constructor: () ->
          @result = ''
        append: (obj) ->
          @result += obj
        get: () ->
          @result

      class Builder
        buildPart: () ->

      class ConcreteBuilder extends Builder
        constructor: () ->
          @product = new Product()
        buildPart: (obj) ->
          @product.append obj.toUpperCase()
        getResult: () ->
          @product

      class Client
        @run: () ->
          concreteBuilder = new ConcreteBuilder()
          director = new Director concreteBuilder
          director.construct "ohai"
          result = concreteBuilder.getResult()
          alert result.get()

      Client.run()

Factory Method
--------------------------------------------------------------------------------

    do ->
      class Product
      class ConcreteProduct1 extends Product
      class ConcreteProduct2 extends Product

      class Creator
        factoryMethod: () ->
        operation: () ->
          product = @factoryMethod()

      class ConcreteCreator extends Creator
        factoryMethod: (id) ->
          switch id
            when id is 1 then return new ConcreteProduct1()      
            when id is 2 then return new ConcreteProduct2()

      class Example
        @run: () ->
          creator = new ConcreteCreator()
          console.log creator.factoryMethod 1
          console.log creator.factoryMethod 2
          console.log creator.factoryMethod 3

      Example.run()

Prototype
--------------------------------------------------------------------------------

    do ->
      class Client
        constructor: () ->
        operation: (prototype) ->
          p = prototype.clone()

      class Prototype
        clone: () ->
          if Object.create
            Object.create @

          else # if < IE9
            Clone = () ->
            Clone:: = @
            new Clone()

        setProperty: (@property) ->
        logProperty: () -> console.log @property or '-'

      class ConcretePrototype1 extends Prototype

      class ConcretePrototype2 extends Prototype

      class Example
        @run: () ->
          client = new Client()
          cp1 = new ConcretePrototype1()
          cp1Prototype = client.operation(cp1)

          cp1.setProperty 'original1'
          cp1Prototype.setProperty 'clone1'
          cp1.logProperty()
          cp1Prototype.logProperty()

      Example.run()

Singleton
--------------------------------------------------------------------------------

    do ->
      class Singleton
        @_instance: null
        @getInstance: ->
          @_instance ||= new @ arguments...

      class Example
        @run: () ->
          class ExampleClass extends Singleton
            constructor: () ->
            properties: {}
            set: (key, val) ->
              @properties[key] = val
              return
            get: (key) ->
              @properties[key]

          example = ExampleClass.getInstance()
          example.set "Singleton", "This is a singleton value"
          console.log example.get "Singleton"

      Example.run()

Structural Patterns
================================================================================

Adapter
--------------------------------------------------------------------------------

    do ->
      class Target
        request: () ->
          console.log "Not fired"

      class Adaptee
        specificRequest: () ->
          console.log "Specific request"

      class Adapter extends Target
        constructor: (@adaptee) ->
        request: () ->
          @adaptee.specificRequest()

      class Client
        @run: () ->
          adaptee = new Adaptee()
          adapter = new Adapter adaptee
          adapter.request()

      Client.run()

Bridge
--------------------------------------------------------------------------------

    do ->
      class Abstraction
        constructor: (@imp) ->
        operation: () ->
          @imp.operationImp()

      class RefinedAbstraction extends Abstraction

      class Implementor
        operationImp: () ->

      class ConcreteImplementorA extends Implementor
        operationImp: () ->
          console.log "ConcreteImplementorA::operationImp"

      class ConcreteImplementorB extends Implementor
        operationImp: () ->
          console.log "ConcreteImplementorB::operationImp"

      class Client
        @run: () ->
          concreteImplementorA = new ConcreteImplementorA()
          refinedAbstractionA = new RefinedAbstraction concreteImplementorA
          refinedAbstractionA.operation()

          concreteImplementorB = new ConcreteImplementorB()
          refinedAbstractionB = new RefinedAbstraction concreteImplementorB
          refinedAbstractionB.operation()

      Client.run()

Composite
--------------------------------------------------------------------------------

    do ->
      class Component
        constructor: () ->
          @list = []
        getComposite: () ->
        operation: () ->
        add: (component) ->

      class Leaf extends Component

      class Composite extends Component
        add: (component) ->
          @list.push component
        operation: () ->
          console.log @list
        getComposite: () ->
          @

      class Client
        @run: () ->
          # Create a Composite object and add a Leaf
          composite = new Composite()
          leaf = new Leaf()
          composite.add leaf
          composite.operation()
          
          # Add a Composite to the Composite
          composite2 = new Composite()
          composite.add composite2
          composite.operation()

      Client.run()

Decorator
--------------------------------------------------------------------------------

    do ->
      class Component
        props: {}
        add: (key, val) ->
          @props[key] = val
        get: () ->
          @props
        process: () ->

      class ConcreteComponent extends Component
        process: () ->

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

      class Example
        @run: () ->
          cmpt = new ConcreteDecoratorA new ConcreteDecoratorB new ConcreteComponent()
          cmpt.process()

      Example.run()


Façade
--------------------------------------------------------------------------------

    do ->
      class Subsystem1
        constructor: () ->
          console.log 'subsystem1'  

      class Subsystem2
        constructor: () ->
          console.log 'subsystem2'

      class Facade
        request: () ->
          s1 = new Subsystem1()
          s2 = new Subsystem2()

      class Client
        @run: () ->
          facade = new Facade()
          facade.request()

      Client.run()

Flyweight
--------------------------------------------------------------------------------

    do ->

      class FlyweightFactory
        constructor: () ->
          @flyweights = {}
        getFlyweight: (args...) ->
          [key] = args
          if @flyweights.hasOwnProperty char
            @flyweights[key]
          else
            @flyweights[key] = new ConcreteFlyweight.apply ConcreteFlyweight, args
    
      class Flyweight
        operation: (extrinsicState) ->
    
      class ConcreteFlyweight extends Flyweight
        constructor: (intrinsicState...) ->
          [@key, @val] = intrinsicState
        operation: (extrinsicState) ->
    
      class UnsharedConcreteFlyweight extends Flyweight
        constructor: (@allState) ->
        operation: (extrinsicState) ->
    
      class Client
        @run: () ->
          factory = new FlyweightFactory()
          factory.getFlyweight 'alfa', '._'
          factory.getFlyweight 'bravo', '_...'
          factory.getFlyweight 'charlie', '_._.'
    
      Client.run()


Proxy
--------------------------------------------------------------------------------

Behavioral Patterns
================================================================================

Chain of Responsibility
--------------------------------------------------------------------------------

Command
--------------------------------------------------------------------------------

    do ->
      class Command
        execute: () ->

      class Invoker
        execute: (command) ->
          command.execute()

      class Receiver
        action1: () -> console.log "action1"
        action2: () -> console.log "action2"

      class ConcreteCommandA extends Command
        constructor: (@receiver) ->
        execute: () ->
          @receiver.action1()

      class ConcreteCommandB extends Command
        constructor: (@receiver) ->
        execute: () ->
          @receiver.action2()

      class Client
        @run: (action) ->
          receiver = new Receiver()
          ccmdA = new ConcreteCommandA receiver
          ccmdB = new ConcreteCommandB receiver
          invoker = new Invoker()
          invoker.execute ccmdA if action is 1
          invoker.execute ccmdB if action is 2

      class Example
        @run: () ->
          Client.run 1
          Client.run 2

      Example.run()


Interpreter
--------------------------------------------------------------------------------

    class Context
      constructor: (@name) ->
      getName: () ->
        @name

    class AbstractExpression
      constructor: () ->
        @expressions = []
      interpret: (@context) ->

    class TerminalExpression extends AbstractExpression
      interpret: (@context) ->
        console.log "Terminal expression for #{@context.getName()}"

    class NonterminalExpression extends AbstractExpression
      addExpression: (expression) ->
        @expressions.push expression

      interpret: (@context) ->
        console.log "Nonterminal expression for #{@context.getName()}"
        for expression in @expressions
          expression.interpret @context

    class Client
      @run: () ->
        context = new Context '*le context'
        root = new NonterminalExpression()
        root.addExpression new TerminalExpression()
        root.addExpression new TerminalExpression()
        root.interpret context

    Client.run()


Thanks to Richard Carr for the [simplest working example][blackwasp_interpreter] 
of this pattern that there is.

Iterator
--------------------------------------------------------------------------------

    do ->
      class Iterator
        first: () ->
        next: () ->
        isDone: () ->
        currentItem: () ->

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
          
      class Aggregate
        createIterator: () ->

      class ConcreteAggregate extends Aggregate
        createIterator: (items) ->
          list = new List()
          for key, val of items
            val.__POINTER__ = key
            list.append val
          new ConcreteIterator list

      class Client
        @run: () ->
          aggregate = new ConcreteAggregate()
          iterator = aggregate.createIterator items

          while not iterator.isDone()
            current = iterator.currentItem()
            # Do something with the item here...
            iterator.next()

      Client.run()

Mediator
--------------------------------------------------------------------------------

    do ->
      class Colleague
        constructor: (@mediator) ->
        changed: () ->
          @mediator.colleagueChanged @

      class ConcreteColleague1 extends Colleague
        event: () ->
          @changed()

      class ConcreteColleague2 extends Colleague
        event: () ->
          @changed()


      class Mediator
        colleagueChanged: (colleague) ->

      class ConcreteMediator extends Mediator
        createColleagues: () ->
          @colleague1 = new ConcreteColleague1 @
          @colleague2 = new ConcreteColleague2 @
          @colleague1.event()
          @colleague2.event()

        colleagueChanged: (colleague) ->
          if colleague instanceof ConcreteColleague1
            console.log "colleague1 changed"
          else if colleague instanceof ConcreteColleague2
            console.log "colleague2 changed"

      class Example
        @run: () ->
          m = new ConcreteMediator()
          m.createColleagues()

      Example.run()

Memento
--------------------------------------------------------------------------------

Observer
--------------------------------------------------------------------------------

    do -> 
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
          i = new ConcreteIterator @observers
          while not i.isDone()
            i.currentItem().update @
            i.next()

      class Observer
        update: (theChangedSubject) ->

      class ConcreteSubject extends Subject

      class ConcreteObserver extends Observer
        update: (theChangedSubject) ->
          console.log "Updated"

      class Example
        @run: () ->
          subject = new ConcreteSubject()
          observer = new ConcreteObserver()
          subject.attach observer 
          subject.notify()

      Example.run()

State
--------------------------------------------------------------------------------

Strategy
--------------------------------------------------------------------------------

    do ->
      class Context
        constructor: (@strategy) ->
        contextInterface: () ->
          @strategy.algorithmInterface()

      class Strategy
        algorithmInterface: () ->

      class ConcreteStrategyA extends Strategy
        algorithmInterface: () ->
          console.log "ConcreteStrategyA"

      class ConcreteStrategyB extends Strategy
        algorithmInterface: () ->
          console.log "ConcreteStrategyB"

      class ConcreteStrategyC extends Strategy
        algorithmInterface: () ->
          console.log "ConcreteStrategyC"

      class Example
        @run: () ->
          context = new Context new ConcreteStrategyA
          resultA = context.contextInterface()

          context = new Context new ConcreteStrategyB
          resultB = context.contextInterface()

          context = new Context new ConcreteStrategyC
          resultC = context.contextInterface()

      Example.run()

Template Method
--------------------------------------------------------------------------------

    do ->
      class AbstractClass
        templateMethod: () ->
          @primitiveOperation1()
          @primitiveOperation2()

        primitiveOperation1: () ->
        primitiveOperation2: () ->

      class ConcreteClass extends AbstractClass
        primitiveOperation1: () ->
          console.log "primitiveOperation1"
        primitiveOperation2: () ->
          console.log "primitiveOperation2"

      # Static Template Method
      class StaticAbstractClass
        @templateMethod: () ->
          cls = new @()
          cls.primitiveOperation1()
          cls.primitiveOperation2()
        primitiveOperation1: () ->
        primitiveOperation2: () ->

      class StaticConcreteClass extends StaticAbstractClass
        primitiveOperation1: () ->
          console.log "primitiveOperation1"
        primitiveOperation2: () ->
          console.log "primitiveOperation2"

      class Example
        @run: () ->
          concrete = new ConcreteClass()
          concrete.templateMethod()

          StaticConcreteClass.templateMethod()

      Example.run()

Visitor
--------------------------------------------------------------------------------

Foundational Classes
================================================================================

List Class
--------------------------------------------------------------------------------

    class List
      constructor: () ->
        # A list of pointers
        @items = []
        
        # Objects passed in by pointer
        @objects = {}

      # Returns the number of objects in the list
      count: () ->
        @items.length

      # Returns the object at the given length
      get: (index) ->
        @objects[@items[index]]
        
      # Returns the first object in the list
      first: () ->
        @objects[@items[0]]

      # Returns the last object in the list
      last: () ->
        @objects[@items[@items.length - 1]]

      # Adds the argument to the list, making it the last item
      append: (item) ->
        pointer = item.__POINTER__
        @items.push pointer
        @objects[pointer] = item

      # Removes the given element from the list.
      remove: (item) ->
        pointer = item.__POINTER__
        delete @objects[pointer]
        index = pointer in @items
        # delete @items[index] if index isnt -1
        @items.splice index, 1

      # Removes the last element from the list
      removeLast: () ->
        @remove @last

      # Removes the first element from the list
      removeFirst: () ->
        @remove @first

      # Removes all elements from the list
      removeAll: () ->
        @items = []
        @objects = {}

    list = new List()
    list.append __POINTER__: "uniqueid", other: "properties"

[blackwasp_interpreter]: http://www.blackwasp.co.uk/Interpreter.aspx
