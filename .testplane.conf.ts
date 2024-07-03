export default {
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
        headless: false,
      },
    },
  },

  plugins: {
    "html-reporter/testplane": {
      enabled: true,
    },
  },
};
