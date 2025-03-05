import { defineConfig } from 'unocss'
import { createUnocssConfig } from '@rengar/unocss'
import { loadEnv } from 'vite'
const env = loadEnv('', process.cwd())
const primaryColorKey = env.VITE_PRIMARY_COLOR_KEY as TailwindColorKey
export default defineConfig(createUnocssConfig(primaryColorKey))
