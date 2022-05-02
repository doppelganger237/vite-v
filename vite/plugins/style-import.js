import {
  createStyleImportPlugin,
  ElementPlusResolve,

} from 'vite-plugin-style-import'

export default function createStyleImport(){

    return createStyleImportPlugin({
        resolves: [
          ElementPlusResolve({
            
            importStyle: 'sass'
          })
        ],

      })
}
