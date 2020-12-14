import React, { useState } from 'react'

const withTouchAnimator = (WrappedComponent) => {
      return ({children, ...props}) => {
        const [animated, setAnimated] = useState(false);
        const [hovering, setHovering] = useState(false);
        const handleMouseDown = () => {
          setAnimated(true);
        };
        const handleMouseUp = () => {
          setAnimated(false);
        };
        const handleMouseEnter = () => {
          setHovering(true)
        }
        const handleMouseLeave = () => {
          setHovering(false)
        }
        console.log(props)
        return (
          <WrappedComponent
            {...props}
            animated={animated}
            hovering={hovering}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
          >
            {children}
          </WrappedComponent>
        );
      };
    };
export default withTouchAnimator
