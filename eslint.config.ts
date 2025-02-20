// 导入 Vue 的 ESLint 插件
import pluginVue from 'eslint-plugin-vue'

// 导入 Vue 和 TypeScript 的 ESLint 配置
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'

// 导入 Prettier 的跳过格式化配置
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

// 使用 `defineConfigWithVueTs` 函数定义 ESLint 配置
export default defineConfigWithVueTs(
  {
    // 配置名称
    name: 'app/files-to-lint',
    // 需要检查的文件类型
    files: ['**/*.{js,jsx,ts,mts,tsx,vue}']
  },

  {
    // 配置名称
    name: 'app/files-to-ignore',
    // 需要忽略的文件或目录
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**']
  },

  // 使用 Vue 的基本配置
  pluginVue.configs['flat/essential'],
  // 使用 Vue 和 TypeScript 的推荐配置
  vueTsConfigs.recommended,
  // 跳过 Prettier 的格式化配置
  skipFormatting,

  // 自定义规则
  {
    name: 'custom-rules',
    rules: {
      // 配置 .vue 文件中组件名称的单词数量
      'vue/multi-word-component-names': [
        'error',
        {
          ignores: ['index', 'App', 'Register', '[id]', '[url]']
        }
      ],
      // 配置 .vue 文件中组件名称的大小写
      'vue/component-name-in-template-casing': [
        'error',
        'PascalCase',
        {
          registeredComponentsOnly: false
        }
      ],
      // 配置 .vue 文件中 <template>、<script> 和 <style> 标签的顺序
      'vue/block-order': [
        'error',
        {
          order: ['template', 'script', 'style']
        }
      ],

      // 禁止未使用的变量
      'no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'warn'
    }
  }
)
