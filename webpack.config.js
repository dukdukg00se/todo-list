const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  // devtool: 'inline-source-map',
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    // clean: true, // removes the index.html
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ]
          }
        }
      },
    ],
  },
};
