
NB. *content.js* contains the core utility methods for page modifications
and embedded UI. This file is the entry point for Webpack and is output to
dist/content.build.js. Any other files use browser-supported methods and 
do not need require use of imports, so are not passed through webpack - these
files, e.g. index.html and manifest.json are simply copied to dist/.
