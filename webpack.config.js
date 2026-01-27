const path = require('path');// module for resolving file paths

const HtmlWebpackPlugin = require('html-webpack-plugin'); // generate an HTML file that includes your bundle

module.exports = {
  // Entry point of the app
  entry: './src/index.js',
  // for the bundled files
  output: {
    // Output dir
    path: path.resolve(__dirname, 'dist'),
    // output bundle file
    filename: 'bundle.js',
    // clean the output directory before emit
    clean: true,
    // public url of the output directory when referenced in a browser
    publicPath: '/',
  },
  // dev mode for better debugging and unminified output
  mode: 'development',
  // gen source maps for easier debugging
  devtool: 'inline-source-map',
  // conf for webpack-dev-server
  devServer: {
    // dir to serve static files from
    static: './dist',
    // enable support for history API based routing (Router)
    historyApiFallback: true,
    // run the dev server on
    port: 3000,
    // auto open the browser 
    open: true,
  },
  // rules for how different file types
  module: {
    rules: [
      {
        // babel-loader for .js and .jsx 
        test: /\.(js|jsx)$/,
        // exclude node_modules from babel-loader
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        // style-loader and css-loader for .css 
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  // imports don't need file extensions
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  // plugins to extend webpack functionality
  plugins: [
    // gen an HTML file from a template and injects the bundle
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
