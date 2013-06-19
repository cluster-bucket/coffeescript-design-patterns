Markdown Converter
==================

    fs = require('fs')
    marked = require('marked')

    # Director
    class MarkdownReader
      constructor: (@builder) ->
      construct: (structure) ->
        links = structure.links
        lastListOrdered = null

        for token in structure
          continue if token is 'links'
          switch token.type
            when 'heading' then @builder.convertHeading token.depth, token.text
            when 'html' then @builder.convertHTML token.pre, token.text
            when 'list_start' 
              lastListOrdered = token.ordered
              @builder.convertListStart token.ordered
            when 'list_end'
              @builder.convertListEnd lastListOrdered
              lastListOrdered = null
            when 'list_item_start' then @builder.convertListItemStart()
            when 'text' then @builder.convertText token.text
            when 'list_item_end' then @builder.convertListItemEnd()
            when 'space' then @builder.convertSpace()
            when 'paragraph' then @builder.convertParagraph token.text
            when 'hr' then @builder.convertHorizontalRule()
            when 'code' then @builder.convertCode token.text
            when 'blockquote_start' then @builder.convertBlockquoteStart()
            when 'blockquote_end' then @builder.convertBlockquoteEnd()
        return

    # Product
    class HTMLText
      constructor: () ->
        @result = ''
      append: (obj) ->
        @result += obj
      get: () ->
        @result

    # Builder
    class TextConverter
      buildPart: () ->

    # ConcreteBuilder
    class HTMLConverter extends TextConverter
      constructor: () ->
        @product = new HTMLText()
      buildPart: (obj) ->
        @product.append obj

      escapeHtml: (unsafe) ->
        unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;")

      convertHeading: (depth, text) ->
        @product.append "<h#{depth}>#{text}</h#{depth}>"

      convertHTML: (pre, text) ->
        if pre
          @product.append "<pre>#{@escapeHtml text}</pre>"
        else
          @product.append text

      convertListStart: (ordered) ->
        if ordered
          @product.append "<ol>"
        else
          @product.append "<ul>"

      convertListEnd: (ordered) ->
        if ordered
          @product.append "</ol>"
        else
          @product.append "</ul>"

      convertListItemStart: () ->
        @product.append "<li>"

      convertListItemEnd: () ->
        @product.append "</li>"

      convertText: (text) ->
        @product.append text

      convertSpace: () ->
        @product.append "&nbsp;"

      convertParagraph: (text) ->
        @product.append "<p>#{text}</p>"

      convertHorizontalRule: () ->
        @product.append "<hr />"

      convertCode: (text) ->
        @product.append "<pre><code>#{@escapeHtml text}</code></pre>"

      convertBlockquoteStart: () ->
        @product.append "<blockquote>"

      convertBlockquoteEnd: () ->
        @product.append "</blockquote>"

      getResult: () ->
        @product

    class Client
      @run: () ->

        filename = './markdown.text'
        fs.readFile filename, 'utf8', (err, data) ->
          throw err if err

          concreteBuilder = new HTMLConverter()
          director = new MarkdownReader concreteBuilder

          tokens = marked.lexer data          
          director.construct tokens
          result = concreteBuilder.getResult()
          console.log result.get()

    Client.run()