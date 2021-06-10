const CopyPlugin = require('copy-webpack-plugin');

const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules(?!\/@bpmn-io\/properties-panel)/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              [ '@babel/plugin-transform-react-jsx', {
                'importSource': 'preact',
                'runtime': 'automatic'
              } ]
            ]
          }
        }
      },
      {
        test: /\.bpmn$/,
        use: {
          loader: 'raw-loader'
        }
      }
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'src/index.html', to: '.' },
        { from: 'node_modules/bpmn-js/dist/assets', to: 'vendor/bpmn-js/assets' },
        { from: 'node_modules/@bpmn-io/bpmn-properties-panel/dist/assets', to: 'vendor/bpmn-properties-panel/assets' },
      ]
    })
  ]
};