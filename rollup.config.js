const typescript = require('@rollup/plugin-typescript');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const terser = require('@rollup/plugin-terser');
const pkg = require('./package.json');
const fs = require('fs');
const path = require('path');

// 从源文件中提取需要保留的导出名称
function getExportedNames() {
  const indexContent = fs.readFileSync('src/index.ts', 'utf-8');
  const exportMatches = indexContent.match(/export\s+(class|const|function|let|var)\s+(\w+)/g) || [];
  const names = exportMatches.map(match => match.split(/\s+/).pop());
  return [...new Set(names)]; // 去重
}

// 递归获取所有 .ts 文件
function getEntries(dir, baseDir = '') {
  const entries = {};
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    // 排除测试相关文件和目录
    if (file === '__tests__' || file.includes('.test.') || file.includes('.spec.')) {
      return;
    }

    const fullPath = path.join(dir, file);
    const relativePath = path.join(baseDir, file);
    const stats = fs.statSync(fullPath);
    
    if (stats.isDirectory()) {
      Object.assign(entries, getEntries(fullPath, relativePath));
    } else if (file.endsWith('.ts') && !file.endsWith('.d.ts')) {
      const name = relativePath.replace(/\.ts$/, '');
      entries[name] = fullPath;
    }
  });
  
  return entries;
}

const entries = getEntries('src');
const reservedNames = getExportedNames();

module.exports = {
  input: entries,
  output: {
    dir: 'dist',
    format: 'esm',
    exports: 'named',
    sourcemap: false,
    compact: true,
    entryFileNames: '[name].js',
    chunkFileNames: '[name]-[hash].js'
  },
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: 'dist',
      sourceMap: false
    }),
    resolve(),
    commonjs(),
    terser({
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log'],
        passes: 3,
        unsafe: true,
        unsafe_math: true,
        unsafe_methods: true,
        unsafe_proto: true,
        unsafe_regexp: true,
        toplevel: true,
        pure_getters: true,
        reduce_vars: true,
        collapse_vars: true
      },
      mangle: {
        toplevel: true,
        properties: {
          regex: /^_/,
          keep_quoted: true
        },
        reserved: reservedNames
      },
      format: {
        comments: false,
        ascii_only: true,
        beautify: false,
        wrap_iife: true
      },
      module: true,
      nameCache: null
    })
  ],
  external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})]
};
