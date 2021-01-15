import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react'
import { CSSTransition } from 'react-transition-group';
import { usePreloadImages } from '../../utils/ui-hooks';
import { ImageCarouselBtnBack, ImageCarouselBtnForward, ImageCarouselContainer, ImageCarouselSlide, ImageCarouselSlideIndicator, ImageCarouselSlideIndicatorGroup } from './imagecarousel.styles'
const ImageCarousel = ({images}) => {

      // Ensure images load in background
      const loadedImages = usePreloadImages(images);
      const back = '-';
      const forward = '+'
      const [activeImage, setActiveImage] = useState(0);
      const [direction, setDirection] = useState()

      // Create endlessl loop with buttons
      // change animation direction accordingly
      const incrementer = (arr, idx, direction, absolute) => {
            if (absolute !== undefined) {
                  setDirection(absolute > idx ? forward : back);
                  setActiveImage(absolute);
                  return;
            }
            setDirection(direction)
            if (direction === back && idx - 1 < 0) {
                  setActiveImage(arr.length - 1)
            } else if (direction === forward && idx + 1 === arr.length) {
                  setActiveImage(0)
            } else {
                  setActiveImage(direction === back ? idx - 1 : idx + 1)
            }
      }

      return (

            <ImageCarouselContainer>

            {
                  loadedImages.length > 1 &&
                  <React.Fragment>
                        <ImageCarouselBtnForward icon={ faChevronRight } onPointerDown={() => incrementer(images, activeImage, '+')}/>
                        <ImageCarouselBtnBack icon={faChevronLeft} onPointerDown={() => incrementer(images, activeImage, '-')}/>
                        <ImageCarouselSlideIndicatorGroup>
                              {
                                    loadedImages.map((e, idx) => (
                                          <ImageCarouselSlideIndicator 
                                                idx={idx} 
                                                activeImage={activeImage} 
                                                arrLength={images.length} 
                                                onPointerDown={() => incrementer(images, activeImage, null, idx)}
                                                key={idx}
                                          />
                                    ))
                              }
                        </ImageCarouselSlideIndicatorGroup>
                  </React.Fragment>
            }

            {
                  loadedImages.map((element, idx) => (
                        <CSSTransition
                              in={activeImage === idx }
                              classNames='imagecarousel'
                              timeout={200}
                              unmountOnExit
                              key={idx}
                        >
                              <ImageCarouselSlide  enter={`${direction}100%`}>
                                    {element}
                              </ImageCarouselSlide>
                        </CSSTransition>
                        
                  ))
            }

            </ImageCarouselContainer>
      )
}

export default ImageCarousel
