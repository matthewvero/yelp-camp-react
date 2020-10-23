import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../../redux/theme.redux'
import { ThemeToggleButtonContainer } from './themetogglebutton.styles'

const ThemeToggleButton = () => {
      const darkMode = useSelector(state => state.themeReducer.darkMode);
      const dispatch = useDispatch();
      const toggleDarkMode = useCallback(
            () => dispatch({ type: toggleTheme })
      ,[dispatch])
      return (
            <ThemeToggleButtonContainer onClick={toggleDarkMode} >
                  <FontAwesomeIcon icon={darkMode ? faMoon : faSun}/>
            </ThemeToggleButtonContainer>
      )
}


export default ThemeToggleButton;
