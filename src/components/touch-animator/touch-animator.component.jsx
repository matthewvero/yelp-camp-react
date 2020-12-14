import React, { useEffect, useState } from 'react'

const TouchAnimator = (child) => {
      const [animated, setAnimated] = useState(false);
      const [NewComponent, setNewComponent] = useState(child)

      const handleMouseDown = () => {
            setAnimated(true)
      }
      const handleMouseUp = () => {
            setAnimated(false)
      }

      useEffect(() => {
            setNewComponent(React.cloneElement(child, {animated: animated}));
      }, [animated, child])
      return (
            <NewComponent onMouseUp={handleMouseUp} onMouseDown={handleMouseDown}/>
      )
}

export default TouchAnimator
