export const useStorage = () => {
  const setStorageItem = <T = unknown>(key: string, item: T) => {
    window.localStorage.setItem(
      key,
      typeof item === "string" ? item : JSON.stringify(item)
    );
  };

  const getStorageItem = <TReturn = string>(
    key: string,
    parse = false
  ): TReturn | null => {
    const value = window.localStorage.getItem(key);
    return parse && value ? JSON.parse(value) : value;
  };

  const removeStorageItem = (key: string) => {
    window.localStorage.removeItem(key);
  };

  return {
    setStorageItem,
    getStorageItem,
    removeStorageItem,
  };
}