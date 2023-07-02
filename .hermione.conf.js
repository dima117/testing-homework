module.exports = {
  sets: {
    desktop: {
      files: "test/hermione",
    },
  },
  baseUrl: "http://localhost:3000/hw/store",
  browsers: {
    chrome: {
      automationProtocol: "devtools",
      desiredCapabilities: {
        browserName: "chrome",
      },
      windowSize: {
        width: 1920,
        height: 1080,
      },
    },
  },
  plugins: {
    "html-reporter/hermione": {
      path: "hermione-html-report",
    },
  },
};
