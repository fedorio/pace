var path = require('path')
var coffee = require('rollup-plugin-coffee-script')

var pkg = require('./package.json')

var plugins = [ coffee() ]

module.exports = {
  rollup: {
    destDir: path.join(__dirname, './'),
    entry: [
      {
        input: './pace.coffee',
        plugins,
        targets: [
          {
            format: 'iife',
            name: 'Pace',
            file: 'pace.js',
            banner: `/*! ${pkg.name} ${pkg.version} */\n`
          }
        ]
      },
      {
        input: './docs/lib/themes.coffee',
        plugins,
        targets: [
          {
            format: 'iife',
            file: 'docs/lib/themes.js'
          }
        ]
      }
    ]
  }
}
