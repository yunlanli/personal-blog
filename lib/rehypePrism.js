var visit = require('unist-util-visit')
var refractor = require('refractor/core')
var jsx = require('refractor/lang/jsx')
var java = require('refractor/lang/java')
var c = require('refractor/lang/c')
var cpp = require('refractor/lang/cpp')
var ruby = require('refractor/lang/ruby')
var python = require('refractor/lang/python')
var css = require('refractor/lang/css')
var cssExtras = require('refractor/lang/css-extras')
var jsExtras = require('refractor/lang/js-extras')
var sql = require('refractor/lang/sql')
var typescript = require('refractor/lang/typescript')
var tsx = require('refractor/lang/tsx')
var markdown = require('refractor/lang/markdown')
var json = require('refractor/lang/json')
var bash = require('refractor/lang/bash')
var docker = require('refractor/lang/docker')
var makefile = require('refractor/lang/makefile')
var latex = require('refractor/lang/latex')
var graphql = require('refractor/lang/graphql')
var git = require('refractor/lang/git')
var go = require('refractor/lang/go')
var vim = require('refractor/lang/vim')


/* This plugin specifies how to highlight HTML syntax trees */
module.exports = rehypePrism

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

function rehypePrism(options) {
    return transformer

    // finds all <code/> elements, parse language,
    // add className attribute, and syntax highlight
    function transformer(tree) {
        visit(tree, visitor)
    }

    function visitor(node, index, parent) {
        if ( node.tagName === 'code') {
            let mdContent = node.children[0].value;

            let lang = node.properties.className ? 
                node.properties.className[0].slice(9).toLowerCase() : ''

            if (lang) 
                try {
                    // add className attribute
                    Object.assign(node, {
                        children: refractor.highlight(mdContent, lang)
                    })
                } catch(err) {
                    throw err;
                }
        }
    }
}