const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const clientPath = path.resolve(__dirname);

module.exports = {
  entry: {
    app: path.resolve(clientPath, "index.js")
  },
  output: {
    path: path.resolve(clientPath, "dist"),
    filename: "js/[name].min.js",
    publicPath: "/"
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(clientPath, "index.html"),
      filename: "index.html"
    })
  ]
};