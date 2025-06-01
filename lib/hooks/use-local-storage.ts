"use client"

import { useState, useEffect } from "react"

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  // Initialize state with initialValue
  const [storedValue, setStoredValue] = useState<T>(initialValue)

  // Flag to track if we're on the client side
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    try {
      if (typeof window !== "undefined") {
        const item = window.localStorage.getItem(key)
        if (item !== null) {
          setStoredValue(JSON.parse(item))
        }
      }
    } catch (error) {
      console.error(`Error reading from localStorage for key "${key}":`, error)
      // If there's an error, we'll stick with the initial value
    }
  }, [key])

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function for previous state pattern
      const valueToStore = value instanceof Function ? value(storedValue) : value

      // Update state immediately
      setStoredValue(valueToStore)

      // Only attempt to write to localStorage on the client side
      if (isClient && typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error(`Error writing to localStorage for key "${key}":`, error)
      // Even if localStorage fails, we still update the state
    }
  }

  return [storedValue, setValue]
}
