module.exports = {
  entry: './src/main',
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