import type { UserConfig } from '@commitlint/types'
import { RuleConfigSeverity } from '@commitlint/types'

const Configuration: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  parserPreset: {
    parserOpts: {
      headerPattern: /^(\:\w+\:)?\s*(\w+)\:\s(.*)$/, // 允许表情符号 + type
      headerCorrespondence: ['emoji', 'type', 'subject']
    }
  },
  rules: {
    'type-enum': [
      RuleConfigSeverity.Error,
      'always',
      [
        'feat', // 新功能
        'fix', // 修复 bug
        'docs', // 文档更新
        'style', // 代码格式（不影响代码运行的变动）
        'refactor', // 代码重构（既不增加新功能，也不修复 bug）
        'test', // 增加测试
        'chore', // 构建过程或辅助工具的变动
        'revert', // 回滚 commit
        'perf', // 性能优化
        'ci', // CI 配置变更
        'build', // 构建系统或外部依赖变更
        'wip', // 工作进行中,
        'init' // 初始化
      ]
    ],
    'type-case': [RuleConfigSeverity.Disabled], // 关闭对 type 大小写的校验
    'type-empty': [RuleConfigSeverity.Error, 'never'], // type 不能为空
    'subject-empty': [RuleConfigSeverity.Error, 'never'], // subject 不能为空
    'subject-case': [RuleConfigSeverity.Disabled], // 关闭对 subject 大小写的校验
    'header-max-length': [RuleConfigSeverity.Disabled] // 关闭对 header 最大长度的校验
  }
}

export default Configuration
