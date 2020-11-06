import React, { useEffect, useRef, useState } from 'react'
import { withRouter } from 'react-router';

import { HeaderButton } from '../header/header.styles';

const HeaderDropDownButton = ({children, title, location}) => {
      const [childVisible, setChildVisible] = useState(false);
      const [prevLocation, setPrevLocation] = useState(location.path);

      const handleClick = (e) => {
            setChildVisible(childVisible => !childVisible);
      }
      const ref = useRef()
      useEffect(() => {
            function handleClickOutside(event) {
                  // Close menu when clicked outside
                  childVisible && !ref.current.contains(event.target) && setChildVisible(false);
            }

            // Bind the event listener
            document.addEventListener("click", handleClickOutside);
            return () => {
                  // Unbind the event listener on clean up
                  document.removeEventListener("click", handleClickOutside);
            };
      }, [childVisible]);

      useEffect(() => {
            setPrevLocation(location.pathname) 
            prevLocation !== location.pathname && setChildVisible(false)
      }, [location])

      return (
            
                  <HeaderButton onClick={handleClick} style={{position: 'relative'}} ref={ref}> 
                        {title}
                        {
                              childVisible &&
                              children
                        }
                  </HeaderButton>

            
      )
}

export default withRouter( HeaderDropDownButton )
