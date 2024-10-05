// @ts-check
import { defineConfig, envField } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [tailwind(), react()],
  experimental: {
    env: {
      schema: {
        URL_BACKEND_CONNECTION: envField.string({
          context: 'client',
          access: 'public',
          default: 'http://localhost:5000/recommend',
        }),  
      }
    }
  }
});