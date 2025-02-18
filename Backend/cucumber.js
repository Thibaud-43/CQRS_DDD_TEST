module.exports = {
  default: {
    requireModule: ["ts-node/register"],
    require: [
      "**/App/__features__/*.steps.ts",
      "**/App/__features__/commonSteps.ts",
    ],
    paths: ["**/App/__features__/*.feature"],
  },
};
