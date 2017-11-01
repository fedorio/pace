(function () {
'use strict';

var Color;
var compileTheme;
var loadTheme;
var vm;

if (typeof module !== "undefined" && module !== null) {
  vm = require('vm');
  Color = require('color');
}

loadTheme = function(name, cb) {
  return $.ajax({
    url: "/pace/templates/pace-theme-" + name + ".tmpl.css",
    success: cb
  });
};

compileTheme = function(body, args) {
  if (args == null) {
    args = {};
  }
  return body.replace(/`([\s\S]*?)`/gm, function(match, code) {
    var val;
    if (typeof module !== "undefined" && module !== null) {
      val = vm.runInNewContext(code, {
        args: args,
        Color: Color
      });
    } else {
      Color = window.Color;
      val = window["eval"](code);
    }
    return val;
  });
};

if (typeof module !== "undefined" && module !== null) {
  module.exports = {
    compileTheme: compileTheme
  };
} else {
  window.loadTheme = loadTheme;
  window.compileTheme = compileTheme;
}

}());
