import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";

// 自动路由
import Pages from "vite-plugin-pages";
import Layouts from "vite-plugin-vue-layouts";

import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import {
  createStyleImportPlugin,
  ElementPlusResolve,
} from "vite-plugin-style-import";

import IconsResolver from "unplugin-icons/resolver";

export default function autoimport(config) {
  return [
    createStyleImportPlugin({
      resolves: [
        ElementPlusResolve({
          importStyle: "sass",
        }),
      ],
    }),
    AutoImport({
      // eslintrc: {
      //   enabled: true, // Default `false`
      //   filepath: "./.eslintrc-auto-import.json", // Default `./.eslintrc-auto-import.json`
      //   globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      // },

      dts: "./auto-imports.d.ts",
      imports: [
        // presets
        "vue",
        "vue-router",
        "pinia",
        {
          "@/stores/app": ["useAppStore"],
          "@/stores/user": ["useUserStore"],
          "@/stores/permission": ["usePermissionStore"],
        },
        // custom
        {
          "@vueuse/core": [
            // named imports
            "useMouse", // import { useMouse } from '@vueuse/core',
            // alias
            ["useFetch", "useMyFetch"], // import { useFetch as useMyFetch } from '@vueuse/core',
          ],
          axios: [
            // default imports
            ["default", "axios"], // import { default as axios } from 'axios',
          ],
          "[package-name]": [
            "[import-names]",
            // alias
            ["[from]", "[alias]"],
          ],
        },
      ],
      resolvers: [
        ElementPlusResolver({
          importStyle: "sass",
          exclude: /ElLoadingDirective/,
        }),
        IconsResolver({
          prefix: "Icon",
        }),
      ],
    }),
    ,
    Components({
      resolvers: [
        IconsResolver({
          enabledCollections: ["ep"],
        }),
        ElementPlusResolver({
          importStyle: "sass",
        }),
      ],
    }),
    ,
    Pages({
      dirs: "src/views",
      exclude: ["**/components/*.vue"],
    }),
    ,
    Layouts({
      exclude: ["**/components/*.vue"],
    }),
  ];
}
