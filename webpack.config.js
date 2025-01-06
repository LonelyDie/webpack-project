const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production', // Режим сборки: production для минификации
  entry: './src/index.js', // Главная точка входа
  output: {
    filename: 'assets/js/[name].[contenthash].js', // Имя выходного файла
    path: path.resolve(__dirname, 'dist'), // Папка для сборки
    clean: true, // Очистка папки dist перед сборкой
  },
  module: {
    rules: [
      {
        test: /\.html$/, // Обработка HTML
        use: ['html-loader'],
      },
      {
        test: /\.(scss|css)$/, // Обработка SCSS и CSS
        use: [
          MiniCssExtractPlugin.loader, // Извлечение CSS в отдельный файл
          'css-loader', // Интерпретация CSS
          'sass-loader', // Компиляция SCSS в CSS
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i, // Обработка изображений
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name].[contenthash][ext]', // Путь для изображений
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i, // Обработка шрифтов
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name].[contenthash][ext]', // Путь для шрифтов
        },
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all', // Разделение кода на общие и специфические части
    },
    minimizer: [
      new CssMinimizerPlugin(), // Минификация CSS
      new TerserPlugin({ parallel: true }), // Минификация JS
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Шаблон HTML
      minify: {
        collapseWhitespace: true, // Удаление пробелов
        removeComments: true, // Удаление комментариев
        removeRedundantAttributes: true, // Удаление избыточных атрибутов
        useShortDoctype: true, // Использование короткого DOCTYPE
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].[contenthash].css', // Путь для CSS-файлов
    }),
  ],
  devServer: {
    static: './dist', // Папка для сервера разработки
    open: true, // Автоматическое открытие браузера
    port: 3000, // Порт сервера разработки
    compress: true, // Включение gzip-сжатия
  },
};
