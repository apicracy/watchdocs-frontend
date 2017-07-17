  /**
 * Dev Server Configuration
 */

module.exports = {
  appName: 'sample-app',

  host: '0.0.0.0',
  public: 'frontend.local',
  disableHostCheck: true,
  port: 3000,

  // configure the proxy to the dev api server
  proxyIsEnabled: false,
  proxyHost: 'localhost',
  proxyPort: 30001,

  // forward following urls to the api server
  proxyUrls: [],

  // forward following rules
  proxyRules: {
      // '/foo': 'http://my-custom-server.com',
  },

  devServer: {
    disableHostCheck: true,
  },
};
