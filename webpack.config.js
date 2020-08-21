const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  // -------------------------
  // Take content.js and build out
  // -------------------------
  entry: {
    'content': './src/content.js', // Background executes content script
    'injected': './src/injected.js', // Injected content
    'panel': './src/panel.js', // DevTools panel JS
  },
  output: {
    filename: '[name].build.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { 
          from: 'src', 
          to: path.resolve(__dirname, 'dist'),
          globOptions: {
            ignore: ['**/lib/**/*']
          }
        }
      ],
    })
  ],
};
