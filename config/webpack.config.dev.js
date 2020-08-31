const { merge } = require('webpack-merge')

const baseWebackConfig = require('./webpack.config.base')

const webpackConfig = merge(baseWebackConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  stats: { children: false }
})

module.exports = webpackConfig