const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const InlineChunkHtmlPlugin = require("react-dev-utils/InlineChunkHtmlPlugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
            dead_code: true,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: "all",
            ascii_only: true,
          },
        },
        extractComments: true,
      }),
      new CssMinimizerPlugin({
        sourceMap: true,
      }),
    ],
    splitChunks: {
      chunks: "all",
      name: false,
    },
    // Keep the runtime chunk separated to enable long term caching
    // https://twitter.com/wSokra/status/969679223278505985
    // https://github.com/facebook/create-react-app/issues/5358
    runtimeChunk: {
      name: (entrypoint) => `runtime-${entrypoint.name}`,
    },
  },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "./",
    pathinfo: false,
    filename: "static/js/[name].[hash:8].js",
    chunkFilename: "static/js/[name].[hash:8].chunk.js",
  },
  resolve: {
    alias: {
      "config.json": path.resolve(__dirname, "src/config.json"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, "assets/index.ejs"),
      filename: path.join(__dirname, "dist/index.html"),
      title: "QR Code Art",
      favicon: path.join(__dirname, "public/favicon.ico"),
      url: "",
      custom: {
        react_lib: "https://unpkg.com/react@17/umd/react.production.min.js",
        react_dom_lib: "https://unpkg.com/react-dom@17/umd/react-dom.production.min.js",
      },
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime~.+[.]js/]),
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[chunkhash:8].css",
      chunkFilename: "static/css/[id].[contenthash].css",
      ignoreOrder: true,
    }),
  ],
});
