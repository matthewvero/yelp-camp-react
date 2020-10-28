
export const toggleTheme = 'TOGGLE_DARK_MODE'


const initialState = {
      darkMode: false
}

const themeReducer = (state = initialState, { type }) => {
      switch (type) {

      case toggleTheme:
            return { darkMode: !state.darkMode }

      default:
            return state
      }
}

export default themeReducer;