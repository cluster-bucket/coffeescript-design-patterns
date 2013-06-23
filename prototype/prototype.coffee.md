

    class Prototype
      clone: () ->
        Clone = () ->
        Clone:: = @
        new Clone()
      setProperty: (@property) ->
      getProperty: () -> @property
      logProperty: () -> console.log @property

    class ConcretePrototype1 extends Prototype
      constructor: (@property) ->
        @setProperty @property

    class Client
      @run: () ->
        p = new ConcretePrototype1 1000
        for value in [1...10]
          clone = p.clone()
          clone.setProperty clone.getProperty() * value
          clone.logProperty()

    Client.run()