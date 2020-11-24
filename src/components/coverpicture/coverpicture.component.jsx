import { faCamera, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { ThemeContext } from 'styled-components';
import { addProfileImage, getUserImages } from '../../firebase.utils.js';
import Image from '../image/image.component.jsx';
import InputImage from '../inputs/input-image/input-image.component';
import { UpdateImageButtonContainer } from '../inputs/input-text/inputs.styles';
import { CoverPictureContainer, NextSlideButton, NoCoverPicture, PrevSlideButton, ScrollContainer, Slide } from './coverpicture.styles';

const CoverPicture = () => {
      const themeContext = useContext(ThemeContext);
      const user = useSelector(state => state.authReducer.user)
      const [images, setImages] = useState([])
      const [currentImage, setCurrentImage] = useState(0)

      const updateCoverImage = async image => {
            const uploadTask = addProfileImage(image, 'coverImages');
            uploadTask.then(async () => {
                  const URLs = await getUserImages('coverImages', user.uid);
                  setImages(URLs);
                  setCurrentImage(0)         
            })
      }

      const handleClick = (direction) => {
            // Cycle through available images
            if (direction === 'next') {
                  setCurrentImage(currentImage => {
                        let num;
                        currentImage + 1 < images.length ? num = currentImage + 1 : num = 0 
                        return num;
                  });
            } else {
                  setCurrentImage(currentImage => {
                        let num;
                        currentImage - 1 < 0 ?  num = images.length - 1 : num = currentImage - 1
                        return num;
                  });
            }
      }

      useEffect(() => {
            const getImages = async () => {
                  const URLs = await getUserImages('coverImages', user.uid);
                  setImages(URLs);
                  
            }
            getImages()
      }, [user])


      return (
            <CoverPictureContainer>
                  <UpdateImageButtonContainer htmlFor='coverImage'>
                        <FontAwesomeIcon icon={faCamera}/>
                  </UpdateImageButtonContainer>

                  <InputImage setImageFn={updateCoverImage} id='coverImage'/>

                  {
                        images.length > 1 &&
                        <React.Fragment>
                              <NextSlideButton href={`#${currentImage}`} onClick={() => handleClick('next')}>
                                    <FontAwesomeIcon icon={faChevronRight}/>
                              </NextSlideButton>
                              
                              <PrevSlideButton href={`#${currentImage}`} onClick={() => handleClick('prev')}>
                                    <FontAwesomeIcon icon={faChevronLeft}/>
                              </PrevSlideButton>
                        </React.Fragment>
                  }

                  <ScrollContainer>
                  
                        {
                              images.length ? 
                              images.map((el, idx) => 
                                    <Slide id={idx} key={idx}>
                                          <Image image={el}/>
                                    </Slide>
                              )
                              :
                              <NoCoverPicture>
                                    
                                    <svg xmlns="http://www.w3.org/2000/svg" style={{position: 'absolute', bottom: '0px', left: '0px'}} viewBox="0 0 1300 300">
                                          <path d="m 0 150 h 250 l 100 -50 l 100 50 l 50 -25 l 50 25 l 125 -50 l 125 50 l 125 -75 l 125 75 h 250 v 200 h -1300 v -200" fill={themeContext.main}/>
                                    </svg>
                              </NoCoverPicture>
                        }
                  </ScrollContainer>
            </CoverPictureContainer>
      )
}

export default CoverPicture
