module.exports = {
  sets: {
    desktop: {
      files: "test/testplane",
    },
  },

  browsers: {
    chrome: {
      automationProtocol: "devtools",
      desiredCapabilities: {
        browserName: "chrome",
      },
    },
  },

  plugins: {
    "html-reporter/testplane": {
      enabled: true,
    },
  },
};
