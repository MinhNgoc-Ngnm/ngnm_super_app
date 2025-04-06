const addSdkCapabilities = (dependencies, devDependencies) => {
  const path = require("path");
  const sdkPackagePath = path.resolve(__dirname, "..", "package.json");
  const sdkPackageJson = require(sdkPackagePath);

  const profile = {
    ...dependencies,
    ...devDependencies,
    rn_super_app_sdk: {
      name: "rn_super_app_sdk",
      version: sdkPackageJson.version,
      devOnly: true,
    },
  };

  return Object.assign(profile, {
    "super-app": {
      name: "#meta",
      capabilities: Object.keys(profile),
    },
  });
};

module.exports = {
  main: addSdkCapabilities(
    require("./dependencies.json"),
    require("./devDependencies.json")
  ),
};
