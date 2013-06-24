Datastore/Provider Bridge
=========================

Create a datastore that will use either local storage or the file system 
depending on the environment, but always use the same interface for interacting
with it.

    # Abstraction
    class AbstractDatastore
      constructor: (@provider) ->
      get: (key) ->
      set: (key, value) ->
      remove: (key) ->

    # RefinedAbstraction
    class Datastore extends AbstractDatastore
      get: (key) -> @provider.read key
      set: (key, value) -> @provider.update key, value
      remove: (key) -> @provider.delete key

    # Implementor
    class Provider
      constructor: (@path) ->

      read: (key) ->
        data = @getData()
        if key then data[key] else data

      update: (key, value) ->
        data = @getData()
        data[key] = value
        @setData data

      delete: (key) ->
        data = @getData()
        delete data[key]
        @setData data

    # ConcreteImplementorA
    class FileSystemProvider extends Provider
      constructor: (@path) ->
        @fs = require 'fs'

      getData: () ->
        json = '{}'
        if @fs.existsSync @path
          json = @fs.readFileSync(@path)  
        data = JSON.parse json

      setData: (data) ->
        json = JSON.stringify data, null, '  '
        @fs.writeFileSync @path, json

    # ConcreteImplementorB
    class LocalStorageProvider extends Provider
      constructor: (@path) ->
      getData: () ->
        json = window.localStorage.getItem(@path) or '{}'
        data = JSON.parse json

      setData: (data) ->
        json = JSON.stringify data, null, '  '
        window.localStorage.setItem @path, json

    class Client
      @run: () ->

        Prov = if window? then LocalStorageProvider else FileSystemProvider
        path = './result.json'

        datastore = new Datastore new Prov path
        datastore.set 'disapproval', '(ಠ_ಠ)'
        datastore.set 'tableflip', '(╯°□°）╯︵ ┻━┻'
        datastore.set 'pedobear', 'ʕ•ᴥ•ʔ'
        console.log datastore.get()

        datastore.remove 'disapproval'
        datastore.remove 'tableflip'
        datastore.remove 'pedobear'
        console.log datastore.get()

    Client.run()