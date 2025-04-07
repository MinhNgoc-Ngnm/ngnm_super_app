const getSharedDependencies = ({ eager = true }) => {
  const dependencies = require("./dependencies.json");

  const shared = Object.entries(dependencies)
    .filter(([dep, props]) => props.shared !== false)
    .map(([dep, { version }]) => {
      return [dep, { singleton: true, eager, requiredVersion: version, version: version }];
    });
  return Object.fromEntries(shared);
};

module.exports = getSharedDependencies;
