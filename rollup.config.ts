import merge from 'deepmerge';
import { createBasicConfig } from '@open-wc/building-rollup';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import pkg from './package.json';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const baseConfig = createBasicConfig({});

export default merge(baseConfig, {
  input: 'src/index.ts',
  output: [
    {
      dir: 'dist',
      format: 'esm',
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve({ extensions }),
    typescript({}),
    commonjs({
      include: /node_modules/,
    }),
  ],
});
