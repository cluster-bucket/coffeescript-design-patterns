Markdown Converter
==================

Requires the `markdown` package and `coffee-script` package.

Run it like this: `coffee -c converter.coffee.md && node converter.js`

    fs = require('fs')
    md = require('markdown').markdown

    # Director
    class MarkdownReader
      constructor: (@builder) ->
      construct: (structure, refs) ->
        for token in structure
          type = token.shift()
          [args...] = token
          switch type
            when 'header' 
              @builder.convertHeading args[0].level, args[1]
            when 'para'
              @builder.convertParagraphStart()
              for arg in args
                arg = ['text', arg] if typeof arg is 'string'
                @construct([arg], refs) 
              @builder.convertParagraphEnd()
            when 'bulletlist'
              @builder.convertBulletListStart()
              @construct(args, refs)
              @builder.convertBulletListEnd()
            when 'listitem'
              @builder.convertListItemStart()
              for arg in args
                arg = ['text', arg] if typeof arg is 'string'
                @construct([arg], refs) 
              @builder.convertListItemEnd()
            when 'link'
              @builder.convertLink args[0], args[1]
            when 'strong'
              @builder.convertStrong args[0]
            when 'link_ref'
              @builder.convertLink refs[args[0].ref] or {}, args[1]
            when 'hr'
              @builder.convertHorizontalRule()
            when 'em'
              @builder.convertEmphasis args[0]
            when 'inlinecode'
              @builder.convertInlineCode args[0]
            when 'code_block'
              @builder.convertCode args[0]
            when 'text'
              @builder.convertText args[0]
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

      convertBulletListStart: () ->
        @product.append "<ul>"

      convertBulletListEnd: () ->
        @product.append "</ul>"

      convertOrderedListStart: () ->
        @product.append "<ol>"

      convertOrderedListEnd: () ->
        @product.append "</ol>"

      convertListItemStart: () ->
        @product.append "<li>"

      convertListItemEnd: () ->
        @product.append "</li>"

      convertLink: (attributes, text) ->
        @product.append "<a href=\"#{attributes.href or ''}\" "
        @product.append "title=\"#{attributes.title or ''}\">#{text}</a>"

      convertText: (text) ->
        @product.append text

      convertParagraphStart: () ->
        @product.append "<p>"

      convertParagraphEnd: () ->
        @product.append "</p>"

      convertStrong: (text) ->
        @product.append "<strong>#{text}</strong>"

      convertEmphasis: (text) ->
        @product.append "<em>#{text}</em>"

      convertHorizontalRule: () ->
        @product.append "<hr />"

      convertCode: (text) ->
        @product.append "<pre><code>#{@escapeHtml text}</code></pre>"

      convertInlineCode: (text) ->
        @product.append "<code>#{@escapeHtml text}</code>"

      convertBlockquoteStart: () ->
        @product.append "<blockquote>"

      convertBlockquoteEnd: () ->
        @product.append "</blockquote>"

      getResult: () ->
        @product

    class Client
      @run: () ->

        fs.readFile './markdown.text', 'utf8', (err, data) ->
          throw err if err

          concreteBuilder = new HTMLConverter()
          director = new MarkdownReader concreteBuilder
    
          tokens = md.parse data
          lang = tokens.shift()
          refs = tokens.shift()

          director.construct tokens, refs.references
          result = concreteBuilder.getResult()

          fs.readFile './template.html', 'utf8', (err, data) ->
            throw err if err
            template = data.replace '{{markdown}}', result.get()

            fs.writeFile "./markdown.html", template, (err) ->
                throw err if err
                console.log 'Wrote markdown.html!\n'

            return
          return
        return

    Client.run()