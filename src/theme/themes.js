const theme = {
      fontSize: '1.5rem',
      logoFontSize: '1.7rem',
      color: 'DODGERBLUE',
      colorHover: '#1ec8ff',
      colorActive: '#1e7dff',
      borderRadius: '10px',
      btnColor: 'white'
}


export const lightTheme = {
      ...theme,
      main: 'white',
      background: '#F0F2F5',
      backgroundAlt: '#eeeeee',
      backgroundHover: '#dddddd',
      backgroundActive: '#cccccc',
      text: 'black',
      textAlt: '#555555',
      borderColor: '#777777',
      boxShadowBottom: '0 1px 2px #bbbbbb',
      boxShadow: '0 1px 2px #bbbbbb',
      borderBtm: 'none',
}

export const darkTheme = {
      ...theme,
      main: 'rgb(36,37,38)',
      background: 'rgb(24,25,26)',
      backgroundAlt: '#444444',
      backgroundHover: '#555555',
      backgroundActive: '#666666',
      text: 'white',
      textAlt: 'white',
      boxShadowBottom: '0 0px 10px #111111',
      boxShadow: '0 0 5px #111111',
      border: 'solid 1px #333333',
}

