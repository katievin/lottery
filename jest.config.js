module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transform: {
    '^.+\\.vue$': 'vue-jest',
  },
  transformIgnorePatterns: ['/node_modules/(?!d3|d3-array|internmap|delaunator|robust-predicates)'],
};
