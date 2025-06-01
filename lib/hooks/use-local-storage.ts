"use client"

export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] => {
  // Initialize state with initialValue to prevent hydration mismatch\
  const [storedValue, setStoredValue] = useState<T>(initialValue)

  // Flag to track if we're on the client side
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
\
    try {\
      if (typeof window !== "undefined" && window.localStorage) {\
        const item = window.localStorage.getItem(key)
        if (item !== null) {\
          const parsedItem = JSON.parse(item)
          setStoredValue(parsedItem)
        }
      }
    } catch (error) {
      console.error(`Error reading from localStorage for key "${key}":`, error)
      // If there's an error, we'll stick with the initial value
    }
  }, [key])

  const setValue = (value: T) => {\
    try {
      // Update state immediately
      setStoredValue(value)
      
      // Only attempt to write to localStorage on the client side\
      if (isClient && typeof window !== "undefined" && window.localStorage) {
        window.localStorage.setItem(key, JSON.stringify(value))
      }
    } catch (error) {
      console.error(`Error writing to localStorage for key "${key}":`, error)
      // Even if localStorage fails, we still update the state
    }
  }

  return [storedValue, setValue]\
}
