import { useCallback } from 'react'

export const useLocalStorage = (key: string) => {
  const getValue = useCallback(() => {
    const item = window.localStorage.getItem(key)
    return item ? JSON.parse(item) : null
  }, [key])

  const setValue = useCallback(
    (value: any) => {
      window.localStorage.setItem(key, JSON.stringify(value))
    },
    [key]
  )

  const removeValue = useCallback(() => {
    window.localStorage.removeItem(key)
  }, [key])

  return { getValue, setValue, removeValue }
}
