module.exports = {
  entry: ['babel-polyfill','./src/main'],
  devtool: 'source-map',
  output: {
    path: './build',
    filename: 'main.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: '/node_modules'
      }
      /*,
      {
        test: require.resolve("jquery"),
        loader: "expose-loader?$"
      }*/
    ]
  }
}