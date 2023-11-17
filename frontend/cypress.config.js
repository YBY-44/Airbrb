import { defineConfig } from 'cypress';
module.exports = defineConfig({
  e2e: {
    testIsolation: false,
  },

  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
  },
});
