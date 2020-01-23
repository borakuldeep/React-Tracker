path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: "./src/index.js",
  output: {
      path: path.join(__dirname, "/dist"),
      filename: "bundle.js"
  },
  module: {
      rules: [{
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
              loader: 'babel-loader',
              options: {
                  presets: ['@babel/preset-react']
              }
          }
      }, 
      
      
      ]
  },
  
}