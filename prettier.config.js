/** @type {import('prettier').Options} */
export default {
  // 在语句末尾添加分号
  semi: false,
  // 使用单引号而不是双引号
  singleQuote: true,
  // 每行的最大长度
  printWidth: 120,

  // 在对象文字中不打印尾随逗号
  trailingComma: 'all',

  // 在对象文字中的括号之间打印空格
  bracketSpacing: true,

  // 将 > 多行 JSX 元素的放在最后一行的末尾，而不是单独放在下一行
  jsxBracketSameLine: false,

  // 使用制表符而不是空格缩进行
  useTabs: false,

  // 每个缩进级别的空格数
  tabWidth: 2,
}
