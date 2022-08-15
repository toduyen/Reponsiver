const exportPathMap = async function (
  defaultPathMap,
  { dev, dir, outDir, distDir, buildId }
) {
  return {
    "/": { page: "/" },
    "/login": { page: "/login" },
  };
};

module.exports = { exportPathMap };
