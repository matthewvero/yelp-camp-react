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
        return (
          <WrappedComponent
            {...props}
            animated={animated}
            hovering={hovering}
            onPointerDown={handleMouseDown}
            onPointerUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
          >
            {children}
          </WrappedComponent>
        );
      };
    };
export default withTouchAnimator
