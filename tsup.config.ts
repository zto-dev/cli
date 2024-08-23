import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/cli.ts', 'src/index.ts'],
  splitting: false,
  clean: true,
  format: ['cjs', 'esm'],
  dts: true,
  outDir: 'dist',
})
