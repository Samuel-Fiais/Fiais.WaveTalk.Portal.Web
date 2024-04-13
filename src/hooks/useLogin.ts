import { AUTH_TOKEN } from "../constants/query-client-constants"
import { useStorage } from "./useStorage"

export const useLogin = () => {
  const { getStorageItem, setStorageItem, removeStorageItem } = useStorage()

  const getAuthToken = () => getStorageItem(AUTH_TOKEN)

  return {
    getAuthToken
  }
}