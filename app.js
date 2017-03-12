"use strict";

module.exports = App;


function App() {
  let middlewares = [];

  this.use = function(middlewareFn) {
    middlewares.push(middlewareFn)
  };

  this.$apply = function(/* All arguments here are passed to all middlewareFn */) {

    // Apply middlewares
    for(let i = 0; i < middlewares.length; i++) {
      middlewares[i].apply(this, arguments);
    }
  }
}

