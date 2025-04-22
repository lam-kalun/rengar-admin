// 初始版本设为空，将在 mounted 时从 version.json 获取
const currentVersion = ref('')

export function useUpdateChecker() {
  const getBasePath = () => {
    // 从当前页面URL推断基础路径
    const path = window.location.pathname
    const appPath = path.substring(0, path.lastIndexOf('/'))
    return appPath.endsWith('/') ? appPath : appPath + '/'
  }

  const basePath = getBasePath()

  console.log('基础路径:', basePath)
  const checkUpdate = async () => {
    try {
      const response = await fetch(`${basePath}version.json?t=${Date.now()}`)
      const data = await response.json()

      // 第一次获取时设置当前版本
      if (!currentVersion.value) {
        currentVersion.value = data.version
        return
      }

      // 比较版本
      if (data.version !== currentVersion.value) {
        openDiaLog()
      }
    } catch (error) {
      console.error('版本检查失败:', error)
    }
  }

  function openDiaLog() {
    window.$dialog.info({
      title: '温馨提示',
      content: '检测到新版本，是否刷新页面？',
      positiveText: '刷新',
      negativeText: '取消',
      onPositiveClick() {
        refreshPage()
      },
    })
  }

  onMounted(() => {
    checkUpdate()
    // 定时检查（例如每5分钟）
    setInterval(checkUpdate, 3000)
  })

  const refreshPage = () => {
    window.location.reload()
  }
}
