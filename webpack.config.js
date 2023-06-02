const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  // Where files should be sent once they are bundled
  entry: './src/index.js',
  output: {
  path: path.join(__dirname, '/dist'),
  filename: 'index.bundle.js'
  },
  // webpack 5 comes with devServer which loads in development mode
 devServer: {
   port: 3000,
   hot: true
 },
  // Rules of how webpack will take our files, complie & bundle them for the browser 
 module: {
   rules: [
     {
       test: /\.(js|jsx)$/,
       exclude: /nodeModules/,
       use: {
         loader: 'babel-loader'
       }
     },
     {
       test: /\.css$/i,
       use: [MiniCssExtractPlugin.loader, 'css-loader']
     },
     {
       test: /\.(png|svg|jpg|jpeg|gif)$/i,
       type: 'asset/resource',
     },
   ]
 },
 plugins: [new HtmlWebPackPlugin({ template: './public/index.html' }), new MiniCssExtractPlugin()],
}