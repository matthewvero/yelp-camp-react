import React from 'react'
import { ButtonContainer } from './button.styles'

const Button = ({children, fn}) => {
      return (
            <ButtonContainer onClick={fn}>
                  {children}
            </ButtonContainer>
      )
}

export default Button
