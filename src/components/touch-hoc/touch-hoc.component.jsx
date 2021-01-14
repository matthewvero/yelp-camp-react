import React, { useState } from 'react'

const withTouchAnimator = (WrappedComponent) => {
  return ({children, fn, ...props}) => {
        const [active, setActive] = useState(false);
        const [hovering, setHovering] = useState(false);
        const handlePointerDown = (e) => {
          e.preventDefault()
          e.stopPropagation()
          setActive(true);
        };
        const handlePointerUp = (e) => {
          e.preventDefault()

          e.stopPropagation()
          setActive(false);
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
            active={active}
            hovering={hovering}
            onPointerDown={e => handlePointerDown(e)}
            onPointerUp={e => handlePointerUp(e)}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
          >
            {children}
          </WrappedComponent>
        );
      };
    };
export default withTouchAnimator
