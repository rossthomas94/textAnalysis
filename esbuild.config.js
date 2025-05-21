import esbuild from 'esbuild';

esbuild.build({
  entryPoints: ['src/handler.ts'],
  bundle: true,
  platform: 'node',
  target: 'node20',
  outfile: 'dist/index.js',
  minify: true
}).catch(() => process.exit(1));