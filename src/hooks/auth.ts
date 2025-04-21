import { useAuthStore } from '@/stores'
export function useAuth(role: string[]) {
  const authStore = useAuthStore()
  if (Array.isArray(role)) {
    return role.some((item) => authStore.roleMap.has(item))
  }
  return false
}
