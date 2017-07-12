module.exports = {
  entry: './src/main',
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
    ]
  }
}