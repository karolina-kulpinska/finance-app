module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.ignoreWarnings = [
        ...(webpackConfig.ignoreWarnings || []),
        { message: /Critical dependency: the request of a dependency is an expression/ },
      ];
      return webpackConfig;
    },
  },
};
