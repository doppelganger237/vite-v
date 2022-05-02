import vue from '@vitejs/plugin-vue'
// 自动导入
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'

// 自动路由
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'

// 图标
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'

import createSvgIcon from './svg-icon'
import createStyleImport from './style-import'


export default function createVitePlugins(viteEnv, isBuild = false) {
    const plugins = [vue()]
    //TODO Vite plugins分离
    plugins.push(Components({
        resolvers: [
            IconsResolver({
                enabledCollections: ['ep'],
            }),
            ElementPlusResolver({
                importStyle: 'sass',
              }),
        ]
    }))

    plugins.push(AutoImport({
        imports: [
            // presets
            'vue',
            'vue-router',
            'pinia',
            { '@/stores/app': ['useAppStore'] , '@/stores/user': ['useUserStore']},
            // custom
            {
                '@vueuse/core': [
                    // named imports
                    'useMouse', // import { useMouse } from '@vueuse/core',
                    // alias
                    ['useFetch', 'useMyFetch'], // import { useFetch as useMyFetch } from '@vueuse/core',
                ],
                'axios': [
                    // default imports
                    ['default', 'axios'], // import { default as axios } from 'axios',
                ],
                '[package-name]': [
                    '[import-names]',
                    // alias
                    ['[from]', '[alias]'],
                ],
            },
        ],
        resolvers: [
            ElementPlusResolver({
                
                importStyle: 'sass'
            }),
            IconsResolver({
                prefix: 'Icon',
            }),
        ],
    }))
    plugins.push(
        Pages({
            dirs: 'src/views',
        })
    )

    plugins.push(
        Layouts()
    )


    plugins.push(
        Icons({
            autoInstall: true,
        })
    )

    plugins.push(createSvgIcon(isBuild))

    plugins.push(createStyleImport())

    return plugins
}