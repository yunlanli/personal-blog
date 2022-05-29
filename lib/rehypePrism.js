import {visit} from 'unist-util-visit'
import {refractor} from 'refractor/lib/core.js'
import jsx from 'refractor/lang/jsx.js'
import java from 'refractor/lang/java.js'
import c from 'refractor/lang/c.js'
import cpp from 'refractor/lang/cpp.js'
import ruby from 'refractor/lang/ruby.js'
import python from 'refractor/lang/python.js'
import css from 'refractor/lang/css.js'
import cssExtras from 'refractor/lang/css-extras.js'
import jsExtras from 'refractor/lang/js-extras.js'
import sql from 'refractor/lang/sql.js'
import typescript from 'refractor/lang/typescript.js'
import tsx from 'refractor/lang/tsx.js'
import markdown from 'refractor/lang/markdown.js'
import json from 'refractor/lang/json.js'
import bash from 'refractor/lang/bash.js'
import docker from 'refractor/lang/docker.js'
import makefile from 'refractor/lang/makefile.js'
import latex from 'refractor/lang/latex.js'
import graphql from 'refractor/lang/graphql.js'
import git from 'refractor/lang/git.js'
import go from 'refractor/lang/go.js'
import vim from 'refractor/lang/vim.js'


/* configure refractor for syntax highlighting */
refractor.register(jsx)
refractor.register(java)
refractor.register(c)
refractor.register(cpp)
refractor.register(python)
refractor.register(ruby)
refractor.register(css)
refractor.register(cssExtras)
refractor.register(jsExtras)
refractor.register(sql)
refractor.register(typescript)
refractor.register(tsx)
refractor.register(markdown)
refractor.register(json)
refractor.register(bash)
refractor.register(docker)
refractor.register(makefile)
refractor.register(latex)
refractor.register(graphql)
refractor.register(git)
refractor.register(go)
refractor.register(vim)

refractor.alias({
  javascript: ['js', 'javascript'],
  cpp: ['cpp','c++'],
  bash: ['bash', 'shell']
})

export default function rehypePrism(options) {
  return transformer

  // syntax highlight all <code /> elements using refractor
  function transformer(tree) {
    visit(tree, visitor)
  }

  function visitor(node, index, parent) {
    if ( node.tagName === 'code') {
      let mdContent = node.children[0].value;

      let lang = node.properties.className ?
        node.properties.className[0].slice(9).toLowerCase() : ''

      if (lang)
        Object.assign(node, {
          children: refractor.highlight(mdContent, lang).children
        })
    }
  }
}
