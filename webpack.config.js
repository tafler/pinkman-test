const env = process.env.NODE_ENV

module.exports = {

  mode: env || 'development',
  output: {
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: [
            ['es2015']
          ]
        }
      }
    ]
  }
}