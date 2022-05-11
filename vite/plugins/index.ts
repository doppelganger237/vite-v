import vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import Unocss from 'unocss/vite'
import vueI18n from '@intlify/vite-plugin-vue-i18n'
import Inspect from 'vite-plugin-inspect'
import createSvgIcon from './svg-icon'
import auto from './auto.js'

export default function createVitePlugins(viteEnv, isBuild = false) {
  const plugins = [vue()]

  // 各种自动导入
  plugins.push(...auto())

  plugins.push(
    Icons({
      scale: 1, // Scale of icons against 1em

      defaultClass: 'svg-icon', // Class names apply to icons
    }),
  )

  // 静态SVG图标
  plugins.push(createSvgIcon(isBuild))

  // https://github.com/antfu/unocss
  plugins.push(...Unocss())
  // https://github.com/intlify/bundle-tools/tree/main/packages/vite-plugin-vue-i18n
  plugins.push(
    vueI18n({
      include: 'locales/**',
    }))

  plugins.push(Inspect())
  return plugins
}
