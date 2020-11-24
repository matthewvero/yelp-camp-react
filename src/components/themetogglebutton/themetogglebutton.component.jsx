import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { ThemeToggleButtonContainer } from './themetogglebutton.styles'

const ThemeToggleButton = () => {
      // Get dark mode from local storage and convert to boolean
      const localDarkMode = localStorage.getItem('darkMode')
      const [darkMode, setDarkmode] = useState(localDarkMode == 'true' ?  true : false);
      const event = new Event('darkModeChanged')
      const toggleDarkMode = () => {
            localStorage.setItem('darkMode', !darkMode)
            dispatchEvent(event);
      }

      // Listen for changes in local storage and update state accordingly
      useEffect(() => {
            const localStorageUpdated = () => {
                  setDarkmode(localStorage.getItem('darkMode') == 'true' ? true : false)
            }
            window.addEventListener('darkModeChanged', localStorageUpdated)
            return () => {
                  window.removeEventListener('darkModeChanged', localStorageUpdated)
            }
      },[])

      return (
            <ThemeToggleButtonContainer onClick={toggleDarkMode} >
                  <FontAwesomeIcon icon={darkMode ? faMoon : faSun}/>
            </ThemeToggleButtonContainer>
      )
}


export default ThemeToggleButton;
