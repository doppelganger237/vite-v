import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'

// 自动路由
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'

import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import {
  ElementPlusResolve,
  createStyleImportPlugin,
} from 'vite-plugin-style-import'

import IconsResolver from 'unplugin-icons/resolver'

export default function autoimport() {
  return [
    createStyleImportPlugin({
      resolves: [
        ElementPlusResolve(),
      ],
    }),
    AutoImport({
      dts: './auto-imports.d.ts',
      imports: [
        // presets
        'vue',
        'vue-router',
        'pinia',
        {
          '@/stores/app': ['useAppStore'],
          '@/stores/user': ['useUserStore'],
          '@/stores/permission': ['usePermissionStore'],
        },
        { 'element-plus/es': ['ElMessage'] },
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
          enabledCollections: ['ep'],
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
