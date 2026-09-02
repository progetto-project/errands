module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@": "./",
            "@components": "./components",
            "@features": "./features",
            "@constants": "./constants",
            "@lib": "./lib",
            "@services": "./services",
            "@hooks": "./hooks",
            "@types": "./types",
            "@utils": "./utils"
          }
        }
      ]
    ]
  };
};
