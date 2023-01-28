import * as webpack from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
import HtmlWebPackPlugin from "html-webpack-plugin";
import path from "path";

// For accept devServer properties
interface WebPackConfiguration extends webpack.Configuration {
  devServer?: WebpackDevServerConfiguration;
}

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./public/index.html",
});

const config: WebPackConfiguration = {
  mode: "development",
  entry: "./src/index.tsx",
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"],
    alias: {
      src: path.resolve(__dirname, "src"),
    },
  },
  devServer: {
    contentBase: path.join(__dirname, "public"),
    compress: true,
    overlay: true,
    liveReload: true,
    port: 8080,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader",
        options: {
          compilerOptions: {
            noEmit: false,
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: "style-loader", // creates style nodes from JS strings
          },
          {
            loader: "css-loader", // translates CSS into CommonJS
          },
          {
            loader: "sass-loader", // compiles SASS to CSS
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|ico|mp3|wav)$/,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [htmlPlugin],
};

export default config;
