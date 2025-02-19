import htmlTemplate from 'vite-plugin-html-template-mpa'

export function setupHtmlPlugin(viteEnv: ImportMetaEnv) {
  return htmlTemplate({
    inject: {
      data: {
        title: viteEnv.VITE_APP_TITLE
      }
    }
  })
}
