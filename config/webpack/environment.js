const { environment } = require('@rails/webpacker');
const webpack = require('webpack');

{
  [
    {
      test: /\.js(\.erb)?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        presets: [['env', { modules: false }]],
      },
    },
  ];
}

// Add an additional plugin of your choosing : ProvidePlugin
environment.plugins.prepend(
  'Provide',
  new webpack.ProvidePlugin({
    $: 'jquery',
    JQuery: 'jquery',
    jquery: 'jquery',
    'window.Tether': 'tether',
    Popper: ['popper.js', 'default'], // for Bootstrap 4
  }),
);

environment.loaders.get('sass').use.splice(-1, 0, {
  loader: 'resolve-url-loader',
  options: {
    attempts: 1,
  },
});

module.exports = environment;
