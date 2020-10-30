import React, { useEffect, useRef, useState } from 'react'

import { HeaderButton } from '../header/header.styles';

// <div 
//                                     style={{
//                                           height: '33px', 
//                                           width: '33px', 
//                                           backgroundColor: themeContext.backgroundActive, 
//                                           borderRadius: '50%', 
//                                           alignItems: 'center', 
//                                           display: 'flex', 
//                                           justifyContent: 'center',
//                                           marginLeft: '-12px',
//                                           marginRight: '10px',
//                                           fontSize: '1.4rem',
//                                     }}
//                               > 
//                                     <FontAwesomeIcon icon={faUser}/>
//             </div>


const HeaderDropDownButton = ({children, title}) => {
      const [childVisible, setChildVisible] = useState(false);
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

      return (
            <React.Fragment >
                  <HeaderButton onClick={handleClick} style={{position: 'relative'}} ref={ref}> 
                        {title}
                        {
                              
                              
                              childVisible &&
                              children
                        }
                  </HeaderButton>

            </React.Fragment>
      )
}

export default HeaderDropDownButton
