const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

console.log(__dirname);
module.exports = {
  entry: {
    main: "./src/client/js/main.js", //처리하고싶은 소스 코드
    videoPlayer: "./src/client/js/videoPlayer.js",
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/styles.css",
    }),
  ],

  mode: "development",
  output: {
    //결과물
    filename: "js/[name].js", //entry의 name을 가져와서 삽입
    path: path.resolve(__dirname, "assets"), // 이어붙일 경로
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader", //js를 babel-loader이용해서 해석하게 해주기
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
};
