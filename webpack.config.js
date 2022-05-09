const path = require("path");

console.log(__dirname);
module.exports = {
  entry: "./src/client/js/main.js", //처리하고싶은 소스 코드
  mode: "development",
  output: {
    //결과물
    filename: "main.js",
    path: path.resolve(__dirname, "assets", "js"), // 이어붙일 경로
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
    ],
  },
};
