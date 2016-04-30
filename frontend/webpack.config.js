var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var precss = require('precss');


// 添加环境变量，以控制react采取开发版本还是正式版本
var env = new webpack.DefinePlugin({
  "process.env": {
    NODE_ENV: JSON.stringify("production")
  }
});

var compress = new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false
  }
});

module.exports = {
  entry: {
    index: './src/index.js'
  },
  output: {
    filename: './public/bundle.js'
  },
  watch: true,
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader"
      }
    ],
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: 'style!css!postcss-loader!sass'
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192'
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  postcss: [autoprefixer, precss],
  resolve: {
    extensions: ['', '.js', '.json', '.scss', '.css', '.png', 'jpg', 'gif'],
  },
  externals: {
    "react": 'React',
    "react-dom": "ReactDOM",
    "react-router": "ReactRouter",
    'history': "History",
    'redux': 'Redux',
    'react-redux': 'ReactRedux'
  },
  plugins: []
};
