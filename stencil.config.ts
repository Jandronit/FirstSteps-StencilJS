import { Config } from '@stencil/core';
import dotenv from "rollup-plugin-dotenv"

export const config: Config = {
  namespace: 'FirststepsStencilJs',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
  plugins: [
    dotenv(),
  ],
  testing: {
    browserHeadless: "new",
  },
};
