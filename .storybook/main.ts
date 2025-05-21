import type { StorybookConfig } from '@storybook/angular';
import { StorybookConfigVite } from '@storybook/builder-vite';
import { UserConfig } from 'vite';

const isDevMode = process.env.NODE_ENV === 'development';

const config: StorybookConfig & StorybookConfigVite = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  core: {
    builder: {
      name: '@storybook/builder-vite',
      options: {
        viteConfigPath: undefined,
      },
    },
  },
  staticDirs: ['../public'],
  async viteFinal(config: UserConfig, { configType }) {
    const { mergeConfig } = await import('vite');
    const { default: angular } = await import('@analogjs/vite-plugin-angular');

    return mergeConfig(config, {
      optimizeDeps: {
        include: ['@storybook/angular', '@angular/compiler', '@storybook/blocks', 'tslib', 'zone.js'],
      },
      resolve: {
        preserveSymlinks: true,
      },
      css: {
        preprocessorOptions: {
          scss: {
            api: 'legacy',
            includePaths: ['node_modules'],
          },
        },
      },
      define: {
        'process.env': {},
        'process.env.NODE_ENV': JSON.stringify(configType === 'PRODUCTION' ? 'production' : 'development'),
        STORYBOOK_ANGULAR_OPTIONS: JSON.stringify({ experimentalZoneless: false }),
      },
      plugins: [angular({ jit: !isDevMode, liveReload: isDevMode, tsconfig: './.storybook/tsconfig.json' })],
      build: {
        rollupOptions: {
          external: ['@angular/router', '@angular/cdk/overlay', /^@simpl\/.*/],
        },
      },
    } satisfies UserConfig);
  },
};

export default config;
