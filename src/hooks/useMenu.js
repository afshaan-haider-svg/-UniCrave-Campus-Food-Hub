import { useState, useEffect } from 'react'

/**
 * Custom Hook: useMenu
 * Handles asynchronous fetching of the campus menu from the local public JSON file.
 * 
 * Educational Notes:
 * - useEffect: Synchronizes the component with external data (side effects) upon mount.
 * - fetch: Native Web API that performs an HTTP GET request and returns a Promise.
 * - async/await: Cleaner syntax for consuming Promises, avoiding callback chaining.
 * - useState: Manages reactive states (menuItems, loading, error) that trigger re-renders.
 * - AbortController: Cancels pending network requests if the component unmounts before completion.
 */
export function useMenu() {
  const [menuItems, setMenuItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [retryTrigger, setRetryTrigger] = useState(0)

  useEffect(() => {
    // AbortController allows canceling this request if the component unmounts
    const controller = new AbortController()

    async function fetchMenu() {
      setLoading(true)
      setError(null)

      try {
        // Fetch from Vite's public asset path (/menu.json)
        const response = await fetch('/menu.json', {
          signal: controller.signal,
          headers: {
            'Accept': 'application/json'
          }
        })

        // Check for HTTP errors (e.g., 404 Not Found, 500 Server Error)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status} (${response.statusText || 'Failed to fetch'})`)
        }

        // Parse JSON response safely
        let data
        try {
          data = await response.json()
        } catch {
          throw new Error('Invalid JSON format: Could not parse menu data.')
        }

        // Validate that data is an array
        if (!Array.isArray(data)) {
          throw new Error('Unexpected data structure: Menu data must be an array.')
        }

        // Validate that array is not empty
        if (data.length === 0) {
          throw new Error('No menu items available today.')
        }

        // Success: Store items and clear loading
        setMenuItems(data)
        setError(null)
      } catch (err) {
        // Ignore abort cancellations caused by component unmount
        if (err.name === 'AbortError') {
          return
        }
        setError(err.message || 'Unable to load the campus menu.')
        setMenuItems([])
      } finally {
        setLoading(false)
      }
    }

    fetchMenu()

    // Cleanup: cancel pending request when component unmounts or before retry
    return () => {
      controller.abort()
    }
  }, [retryTrigger])

  // Retry mechanism: changing retryTrigger will cause useEffect to re-run
  const retry = () => {
    setRetryTrigger((prev) => prev + 1)
  }

  return { menuItems, loading, error, retry }
}

export default useMenu
