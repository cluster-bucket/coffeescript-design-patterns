Template Interpreter
====================

Demonstrate a basic interpreter which replaces {{text}} blocks with data passed
to the context. The Interpreter pattern does not address parsing, but the parser
class does it anyway, for completeness.

    fs = require 'fs'

    # Context
    class TemplateData
      constructor: () ->
        @vars = {}
      set: (key, val) ->
        @vars[key] = val
      get: (key) ->
        @vars[key]

    # Abstract Expression
    class Template
      interpret: (@context) ->

    # Terminal Expression
    class TemplateBlock extends Template
      constructor: (@key) ->
      interpret: (@context) ->
        @context.get @key

    # Terminal Expression
    class TemplateText extends Template
      constructor: (@text) ->
      interpret: (@context) ->
        @text

    # Non Terminal Expression
    class TemplateParser extends Template
      constructor: (expression) ->
        @stack = []
        regex = /(\{{2}\w*\}{2})/
        for token in expression.split regex
          if token.match regex
            @stack.push new TemplateBlock token.slice 2, -2
          else @stack.push new TemplateText token

      interpret: (@context) ->
        result = []
        for expression in @stack
          result.push expression.interpret @context
        result.join ''

    class Client
      @run: () ->

        fs.readFile '../assets/template.html', 'utf8', (err, expression) ->
          throw err if err

          variables = new TemplateData()
          variables.set 'title', 'Template Interpreter'
          variables.set 'stylesheet', '../assets/styles.css'
          variables.set 'content', 'Hello, world!'

          sentence = new TemplateParser expression         
          result = sentence.interpret variables

          fs.writeFile "./result.html", result, (err) ->
            throw err if err
            console.log 'Wrote result.html!\n'

    Client.run()