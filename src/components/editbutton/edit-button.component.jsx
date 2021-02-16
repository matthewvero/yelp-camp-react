import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import withTouchAnimator from '../touch-hoc/touch-hoc.component'
import { EditButtonIcon } from './edit-button.styles'

const EditButton = ({editing, style, ...props}) => {
      return (
            <EditButtonIcon {...props} style={style} icon={editing ? faTimes : faPen}/>
      )
}

export default withTouchAnimator(EditButton);
