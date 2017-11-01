###*
# Rollup worker for bundle multiple entry
#
# MIT Licensed
#
# Authors:
#   Allex Wang <allex.wxn@gmail.com> (http://iallex.com/)
###

logError = (e) ->
  console.log e
  return

fs = require('fs')
Path = require('path')
glob = require('glob')
mkdirp = require('mkdirp')
Rollup = require('rollup-worker')
fssConfig = require('config-finder')('fss')
ThemeUtils = require('../docs/lib/themes.coffee')

resolve = (p) ->
  Path.resolve(__dirname, p)

themes =
  src: resolve('../templates/*.tmpl.css')
  dest: resolve('../themes')
  colors:
    black:  '#000000'
    white:  '#ffffff'
    silver: '#d6d6d6'
    red:    '#ee3148'
    orange: '#eb7a55'
    yellow: '#fcd25a'
    green:  '#22df80'
    blue:   '#2299dd'
    pink:   '#e90f92'
    purple: '#7c60e0'

# build themes
glob themes.src, (err, files) ->
  for colorName, color of themes.colors
    for file in files
      body = ThemeUtils.compileTheme fs.readFileSync(file).toString(), {color}

      body = "/* This is a compiled file, you should be editing the file in the templates directory */\n" + body

      name = Path.basename(file).replace '.tmpl', ''
      mkdirp.sync Path.join themes.dest, colorName
      path = Path.join themes.dest, colorName, name

      fs.writeFileSync path, body

# build distributes
cfg = fssConfig.sync(null, process.cwd(), rcExtensions: true)
if cfg = cfg and cfg.config
  worker = new Rollup(cfg.rollup)
  worker.build()
else
  throw new Error('fss config not found.')
