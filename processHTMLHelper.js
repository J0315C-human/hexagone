const fs = require('fs');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = () => {
  const sourcePath = `${fs.realpathSync(`${__dirname}/dist/src/`)}/`;
  const htmlDocuments = glob.sync(`${__dirname}/dist/src/**/*.html`);

  return htmlDocuments.map(document => {
    const filename = document.replace(sourcePath, '');
    return new HtmlWebpackPlugin({
      template: document,
      filename,
      hash: true,
    });
  });
};
