import React, { useState } from 'react'

const withTouchAnimator = (WrappedComponent) => {
  return ({children, fn, ...props}) => {
        const [animated, setAnimated] = useState(false);
        const [hovering, setHovering] = useState(false);
        const handlePointerDown = () => {
          setAnimated(true);
        };
        const handlePointerUp = () => {
          setAnimated(false);
          fn &&
          fn()
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
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
          >
            {children}
          </WrappedComponent>
        );
      };
    };
export default withTouchAnimator
