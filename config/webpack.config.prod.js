const { merge } = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')

const baseWebackConfig = require('./webpack.config.base')

const webpackConfig = merge(baseWebackConfig, {
  mode: 'production',
  stats: { children: false, warnings: false },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          warnings: false,
          compress: {
            warnings: false,
            drop_console: false,
            dead_code: true,
            drop_debugger: true
          },
          output: {
            comments: false,
            beautify: false
          },
          mangle: true
        },
        parallel: true,
        sourceMap: false
      })
    ],
    splitChunks: {
      cacheGroups: {
        commons: {
          name: "commons",
          chunks: "initial",
          minChunks: 3,
          enforce: true
        }
      }
    }
  }
})

module.exports = webpackConfig