
export const toggleTheme = 'TOGGLE_DARK_MODE'


const initialState = {
      darkMode: true
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