const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.config.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: { loader: "babel-loader" }
      },
      {
        test: /\.(css|scss)$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  devServer: {
    port: 3001,
    inline: true,
    hot: true,
    compress: true,
    overlay: true,
    open: true,
    disableHostCheck: true,
    historyApiFallback: true,
    proxy: {
      "/api": {
        target: "http://localhost:3004",
        changeOrigin: true,
        pathRewrite: { "^/api": "" }
      }
    }
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
});
