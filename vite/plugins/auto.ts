import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'

// 自动路由
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'

import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
/* import {
  ElementPlusResolve,
  createStyleImportPlugin,
} from 'vite-plugin-style-import' */
// import ElementPlus from 'unplugin-element-plus/vite'

import IconsResolver from 'unplugin-icons/resolver'
import type { Plugin } from 'vite'

export default function autoimport(): Plugin[] {
  return [
    // createStyleImportPlugin({
    //   resolves: [
    //     ElementPlusResolve(),
    //   ],
    // }),
    // ElementPlus({
    //   // options
    // }),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/, /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      dts: 'src/auto-imports.d.ts',
      imports: [
        // presets
        'vue',
        'vue-router',
        'pinia',
        'vue-i18n',
        {
          '@/stores/app': ['useAppStore'],
          '@/stores/user': ['useUserStore'],
          '@/stores/permission': ['usePermissionStore'],
        },
        { 'element-plus/es': ['ElMessage'] }, // 自动导入BUG
      ],
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass',
          exclude: /ElLoadingDirective/,
        }),
        IconsResolver({
          prefix: 'Icon',
        }),
      ],
    }),
    Components({
      dts: 'src/components.d.ts',
      resolvers: [
        IconsResolver({
        }),
        ElementPlusResolver({
          importStyle: 'sass',
        }),
      ],
    }),
    Pages({
      dirs: 'src/views',
      exclude: ['**/components/*.vue'],
    }),
    Layouts({
      exclude: ['**/components/*.vue'],
    }),
  ]
}
