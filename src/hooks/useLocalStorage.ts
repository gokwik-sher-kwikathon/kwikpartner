import { useState, useEffect } from 'react';

/**
 * Custom hook for using localStorage with automatic JSON parsing/stringifying
 * @param key The localStorage key
 * @param initialValue The initial value if the key doesn't exist in localStorage
 * @returns A stateful value and a function to update it
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // Get from localStorage then
  // parse stored json or return initialValue
  const readValue = (): T => {
    // Prevent build error "window is undefined" but keep working
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  };

  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(readValue);

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage.
  const setValue = (value: T) => {
    // Prevent build error "window is undefined" but keep working
    if (typeof window === 'undefined') {
      console.warn(`Tried setting localStorage key "${key}" even though environment is not a client`);
    }

    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;

      // Save to state
      setStoredValue(valueToStore);

      // Save to localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  // Listen for changes to this localStorage key in other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        setStoredValue(JSON.parse(e.newValue));
      }
    };

    // Add event listener for 'storage' events
    window.addEventListener('storage', handleStorageChange);

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]);

  return [storedValue, setValue];
}
