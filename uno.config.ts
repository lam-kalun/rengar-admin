import { defineConfig } from 'unocss'
import { loadEnv } from 'vite'
import { createUnocssConfig } from '@rengar/unocss'

const env = loadEnv('', process.cwd()) as unknown as ImportMetaEnv
const primaryColorKey = env.VITE_PRIMARY_COLOR_KEY
export default defineConfig(createUnocssConfig(primaryColorKey))
