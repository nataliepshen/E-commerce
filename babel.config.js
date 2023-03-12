module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV);

  const presets = [
    "@babel/preset-env",
    "@babel/preset-react",
    "@babel/preset-typescript",
  ];
  const plugins = [
    "@babel/plugin-proposal-optional-chaining",
    process.env.NODE_ENV === "development" && "react-refresh/babel",
    ["module:fast-async", { spec: true }],
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    "@babel/plugin-proposal-class-properties",
  ].filter(Boolean);

  return {
    presets,
    plugins,
  };
};
