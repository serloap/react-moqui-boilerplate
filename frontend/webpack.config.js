const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (__, { mode }) => {
  const isEnvProduction = mode === 'production';
  const useSourceMap = true;

  const getStyleLoaders = (cssOptions, preProcessor) => ([
    isEnvProduction ? require('mini-css-extract-plugin').loader : require.resolve('style-loader'),
    {
      loader: require.resolve('css-loader'),
      options: {
        ...cssOptions,
        sourceMap: useSourceMap,
      },
    },
    preProcessor && {
      loader: require.resolve(preProcessor),
      options: {
        sourceMap: useSourceMap,
      },
    },
  ].filter(Boolean));

  return {
    entry: path.resolve(__dirname, 'src/main.js'),
    output: {
      path: isEnvProduction ? path.resolve(__dirname, '../screen/reactMoquiComponent/') : undefined,
      filename: isEnvProduction
        ? 'static/js/[name].[contenthash:8].js'
        : 'static/js/bundle.js',
      chunkFilename: isEnvProduction
        ? 'static/js/[name].[contenthash:8].chunk.js'
        : 'static/js/[name].chunk.js',
      pathinfo: !isEnvProduction,
      publicPath: isEnvProduction ? '/reactMoquiComponent/' : '/',
    },
    module: {
      rules: [
        isEnvProduction ? {} : {
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          enforce: 'pre',
          use: [
            {
              options: {
                eslintPath: require.resolve('eslint'),
                emitWarning: true,
              },
              loader: require.resolve('eslint-loader'),
            },
          ],
          include: path.resolve(__dirname, 'src'),
        },
        {
          oneOf: [
            {
              test: /\.(js|mjs|jsx|ts|tsx)$/,
              exclude: /node_modules(?!(\/|\\)(css-loader)(\/|\\).*)/, // MiniCss throws an error without this
              loader: require.resolve('babel-loader'),
              options: {
                cacheDirectory: true,
                cacheCompression: isEnvProduction,
              },
            },
            {
              test: /\.css$/,
              use: getStyleLoaders(),
              sideEffects: true,
            },
            {
              test: /\.s[ac]ss$/,
              use: getStyleLoaders(
                {
                  importLoaders: 1,
                },
                'sass-loader',
              ),
              sideEffects: true,
            },
            {
              test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
              loader: require.resolve('url-loader'),
              options: {
                limit: 10240,
                name: 'static/media/[name].[hash:8].[ext]',
              },
            },
            {
              test: /\.test$/,
              loader: require.resolve('file-loader'),
              options: {
                name: 'static/media/[name].[hash:8].[ext]',
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      isEnvProduction && new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
      }),
      new HtmlWebpackPlugin({
        inject: false,
        template: path.resolve(__dirname, 'public/index.html'),
        title: 'React Moqui Component',
        ...isEnvProduction ? {
          xhtml: true,
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            preserveLineBreaks: true,
            removeRedundantAttributes: true,
            useShortDoctype: false,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: false,
            minifyCSS: true,
            minifyURLs: true,
          },
        } : {},
      }),
    ].filter(Boolean),
    optimization: {
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: useSourceMap,
        }),
      ],
      splitChunks: {
        chunks: 'all',
        name: false,
      },
      runtimeChunk: true,
    },
    devtool: isEnvProduction ? 'cheap-source-map' : 'eval-cheap-module-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public/'),
      compress: true,
      hotOnly: true,
      port: 3001,
      proxy: {
        context: ['/rest', '/apps', '/Login'],
        target: 'http://localhost:8080',
        secure: false,
        changeOrigin: true,
      },
    },
  };
};
