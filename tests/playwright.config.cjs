// Optional contributor tests only. The website itself has no toolchain or server.
module.exports = {
  testDir: __dirname,
  testMatch: 'site.spec.cjs',
  fullyParallel: true,
  reporter: 'list',
};
