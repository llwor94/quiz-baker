import React, { useState, createContext, useEffect, Fragment } from 'react'
import { ThemeProvider } from 'styled-components'
import { DarkMode } from './Themes/dark'
import { LightMode } from './Themes/light'
import { mixins } from 'styles/mixins'

export const ThemeCtx = createContext([undefined, () => {}])

const ColorProvider = ({ children }) => {
  const [darkMode, setValue] = useState(false)

  useEffect(() => {
    let dark = localStorage.getItem('darkMode')
    if (dark) {
      setValue(true)
    }
  }, [])

  return (
    <ThemeCtx.Provider value={[darkMode, setValue]}>
      <ThemeProvider theme={{ ...(darkMode ? DarkMode : LightMode), ...mixins }}>
        <Fragment>{children}</Fragment>
      </ThemeProvider>
    </ThemeCtx.Provider>
  )
}

export default ColorProvider
