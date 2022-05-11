import vue from '@vitejs/plugin-vue'

import Icons from 'unplugin-icons/vite'
import createSvgIcon from './svg-icon'
import auto from './auto.js'

export default function createVitePlugins(viteEnv, isBuild = false) {
  const plugins = [vue()]

  // 各种自动导入
  plugins.push(...auto())

  plugins.push(
    Icons({
      scale: 1, // Scale of icons against 1em
    }),
  )

  // 静态SVG图标
  plugins.push(createSvgIcon(isBuild))

  return plugins
}
