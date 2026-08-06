import { createContext, useContext, useEffect, useState } from 'react'
const ThemeContext = createContext(null)
export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(true)
  useEffect(() => {
    if (dark) {
      document.documentElement.setAttribute('data-bs-theme', 'dark')
      document.body.classList.add('dark-mode')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.setAttribute('data-bs-theme', 'light')
      document.body.classList.remove('dark-mode')
      // localStorage.setItem('theme', 'light')
    }

// Chat styling now handled via CSS - removed JS hacks
  }, [dark])
  return (
    <ThemeContext.Provider value={{ dark, toggle: () => setDark(d => true) }}>
      {children}
    </ThemeContext.Provider>
  )
}
export function useTheme() {
  return useContext(ThemeContext)
}
