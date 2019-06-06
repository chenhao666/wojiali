'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const webpack = require("webpack")
const PrerenderSpaPlugin = require('prerender-spa-plugin')

const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const Renderer = PrerenderSpaPlugin.PuppeteerRenderer


function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  /*test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }*/
})

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: ["babel-polyfill","./src/main.js"]
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
        	resolve('src'), 
        	resolve('test'), 
        	resolve('node_modules/webpack-dev-server/client'),
        	resolve('/node_modules/element-ui/src'),
        	resolve('/node_modules/element-ui/src/packages'),
        	resolve('/node_modules/_element-ui@2.7.2@element-ui/src'),
        	resolve('/node_modules/_element-ui@2.7.2@element-ui/packages')
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
		new webpack.optimize.CommonsChunkPlugin('common.js'),
		new webpack.ProvidePlugin({
		jQuery: "jquery",
		$: "jquery"
		}),
		// PrerenderSpaPlugin
    new PrerenderSpaPlugin({
        // 生成文件的路径，也可以与webpakc打包的一致。
        staticDir: path.join(__dirname, '../dist'),
        
        // 对应自己的路由文件，比如index有参数，就需要写成 /index/param1。
        //routes: ['/', '/stylePai','/stylePai/info/param1','/floor','/house/param1','/goodsThing','/goods/info/param1','/aboutUs','/case','/programme/param1','/search/param1','/download','/storeList'],
        routes: ['/wap','/wap/floor','/wap/house/param1','/wap/programme/param1','/wap/stylePai','/wap/stylePai/info/param1','/wap/goodsThing','/wap/goods/info/param1','/wap/aboutUs','/wap/case','/wap/search/param1','/wap/chat','/wap/storeList'],
       
        // 这个很重要，如果没有配置这段，也不会进行预编译
        renderer: new Renderer({
        		ignoreJSErrors: true,
            inject: {
              foo: 'bar'
            },
            headless: false,
            //defaultViewport:{width:1366,height:768},
            // 在 main.js 中 document.dispatchEvent(new Event('render-event'))，两者的事件名称要对应上。
            renderAfterDocumentEvent: 'render-event'
        })
    })
	],
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
