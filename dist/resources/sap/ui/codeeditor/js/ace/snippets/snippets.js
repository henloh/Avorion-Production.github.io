ace.define("ace/snippets/snippets",[],function(e,t,p){"use strict";t.snippetText="# snippets for making snippets :)\nsnippet snip\n\tsnippet ${1:trigger}\n\t\t${2}\nsnippet msnip\n\tsnippet ${1:trigger} ${2:description}\n\t\t${3}\nsnippet v\n\t{VISUAL}\n";t.scope="snippets"});(function(){ace.require(["ace/snippets/snippets"],function(e){if(typeof module=="object"&&typeof exports=="object"&&module){module.exports=e}})})();