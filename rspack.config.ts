import * as path from "path";
import * as rspack from "@rspack/core";
import HtmlWebpackPlugin from "html-rspack-plugin";
// import MiniCssExtractPlugin from "mini-css-extract-plugin";

const isProduction = process.env.NODE_ENV == "production";

const config: rspack.Configuration = {
  mode: isProduction ? "production" : "development",
  entry: "./src/client/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/hw/store",
  },
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/static/index.html",
    }),
    new rspack.CssExtractRspackPlugin({}),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
      {
        test: /\.css$/i,
        use: [rspack.CssExtractRspackPlugin.loader, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          rspack.CssExtractRspackPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};

export default config;
