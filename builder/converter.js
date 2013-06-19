// Generated by CoffeeScript 1.6.3
(function() {
  var Client, HTMLConverter, HTMLText, MarkdownReader, TextConverter, fs, md,
    __slice = [].slice,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  fs = require('fs');

  md = require('markdown').markdown;

  MarkdownReader = (function() {
    function MarkdownReader(builder) {
      this.builder = builder;
    }

    MarkdownReader.prototype.construct = function(structure, refs) {
      var arg, args, token, type, _i, _j, _k, _len, _len1, _len2;
      for (_i = 0, _len = structure.length; _i < _len; _i++) {
        token = structure[_i];
        type = token.shift();
        args = 1 <= token.length ? __slice.call(token, 0) : [];
        switch (type) {
          case 'header':
            this.builder.convertHeading(args[0].level, args[1]);
            break;
          case 'para':
            this.builder.convertParagraphStart();
            for (_j = 0, _len1 = args.length; _j < _len1; _j++) {
              arg = args[_j];
              if (typeof arg === 'string') {
                arg = ['text', arg];
              }
              this.construct([arg], refs);
            }
            this.builder.convertParagraphEnd();
            break;
          case 'bulletlist':
            this.builder.convertBulletListStart();
            this.construct(args, refs);
            this.builder.convertBulletListEnd();
            break;
          case 'listitem':
            this.builder.convertListItemStart();
            for (_k = 0, _len2 = args.length; _k < _len2; _k++) {
              arg = args[_k];
              if (typeof arg === 'string') {
                arg = ['text', arg];
              }
              this.construct([arg], refs);
            }
            this.builder.convertListItemEnd();
            break;
          case 'link':
            this.builder.convertLink(args[0], args[1]);
            break;
          case 'strong':
            this.builder.convertStrong(args[0]);
            break;
          case 'link_ref':
            this.builder.convertLink(refs[args[0].ref] || {}, args[1]);
            break;
          case 'hr':
            this.builder.convertHorizontalRule();
            break;
          case 'em':
            this.builder.convertEmphasis(args[0]);
            break;
          case 'inlinecode':
            this.builder.convertInlineCode(args[0]);
            break;
          case 'code_block':
            this.builder.convertCode(args[0]);
            break;
          case 'text':
            this.builder.convertText(args[0]);
        }
      }
    };

    return MarkdownReader;

  })();

  HTMLText = (function() {
    function HTMLText() {
      this.result = '';
    }

    HTMLText.prototype.append = function(obj) {
      return this.result += obj;
    };

    HTMLText.prototype.get = function() {
      return this.result;
    };

    return HTMLText;

  })();

  TextConverter = (function() {
    function TextConverter() {}

    TextConverter.prototype.buildPart = function() {};

    return TextConverter;

  })();

  HTMLConverter = (function(_super) {
    __extends(HTMLConverter, _super);

    function HTMLConverter() {
      this.product = new HTMLText();
    }

    HTMLConverter.prototype.buildPart = function(obj) {
      return this.product.append(obj);
    };

    HTMLConverter.prototype.escapeHtml = function(unsafe) {
      return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    };

    HTMLConverter.prototype.convertHeading = function(depth, text) {
      return this.product.append("<h" + depth + ">" + text + "</h" + depth + ">");
    };

    HTMLConverter.prototype.convertBulletListStart = function() {
      return this.product.append("<ul>");
    };

    HTMLConverter.prototype.convertBulletListEnd = function() {
      return this.product.append("</ul>");
    };

    HTMLConverter.prototype.convertOrderedListStart = function() {
      return this.product.append("<ol>");
    };

    HTMLConverter.prototype.convertOrderedListEnd = function() {
      return this.product.append("</ol>");
    };

    HTMLConverter.prototype.convertListItemStart = function() {
      return this.product.append("<li>");
    };

    HTMLConverter.prototype.convertListItemEnd = function() {
      return this.product.append("</li>");
    };

    HTMLConverter.prototype.convertLink = function(attributes, text) {
      this.product.append("<a href=\"" + (attributes.href || '') + "\" ");
      return this.product.append("title=\"" + (attributes.title || '') + "\">" + text + "</a>");
    };

    HTMLConverter.prototype.convertText = function(text) {
      return this.product.append(text);
    };

    HTMLConverter.prototype.convertParagraphStart = function() {
      return this.product.append("<p>");
    };

    HTMLConverter.prototype.convertParagraphEnd = function() {
      return this.product.append("</p>");
    };

    HTMLConverter.prototype.convertStrong = function(text) {
      return this.product.append("<strong>" + text + "</strong>");
    };

    HTMLConverter.prototype.convertEmphasis = function(text) {
      return this.product.append("<em>" + text + "</em>");
    };

    HTMLConverter.prototype.convertHorizontalRule = function() {
      return this.product.append("<hr />");
    };

    HTMLConverter.prototype.convertCode = function(text) {
      return this.product.append("<pre><code>" + (this.escapeHtml(text)) + "</code></pre>");
    };

    HTMLConverter.prototype.convertInlineCode = function(text) {
      return this.product.append("<code>" + (this.escapeHtml(text)) + "</code>");
    };

    HTMLConverter.prototype.convertBlockquoteStart = function() {
      return this.product.append("<blockquote>");
    };

    HTMLConverter.prototype.convertBlockquoteEnd = function() {
      return this.product.append("</blockquote>");
    };

    HTMLConverter.prototype.getResult = function() {
      return this.product;
    };

    return HTMLConverter;

  })(TextConverter);

  Client = (function() {
    function Client() {}

    Client.run = function() {
      fs.readFile('./markdown.text', 'utf8', function(err, data) {
        var concreteBuilder, director, lang, refs, result, tokens;
        if (err) {
          throw err;
        }
        concreteBuilder = new HTMLConverter();
        director = new MarkdownReader(concreteBuilder);
        tokens = md.parse(data);
        lang = tokens.shift();
        refs = tokens.shift();
        director.construct(tokens, refs.references);
        result = concreteBuilder.getResult();
        fs.readFile('./template.html', 'utf8', function(err, data) {
          var template;
          if (err) {
            throw err;
          }
          template = data.replace('{{markdown}}', result.get());
          fs.writeFile("./markdown.html", template, function(err) {
            if (err) {
              throw err;
            }
            return console.log('Wrote markdown.html!\n');
          });
        });
      });
    };

    return Client;

  })();

  Client.run();

}).call(this);
