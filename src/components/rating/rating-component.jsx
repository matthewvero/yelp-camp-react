import { faStar } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import { HR } from '../misc/containers.styles'
import { Text } from '../misc/text.styles'
import { RatingStar } from './rating.styles'

const Rating = ({setStars, title, highlight, filledArr, display, displayRating, collapse}) => {
      const [rating, setRating] = useState(0);
      const [previewRating, setPreviewRating] = useState(0);
      const [interacted, setInteracted] = useState(false);
      const stars = [];
      const handleRating = (i) => {
            !display &&
            setRating(i + 1);
            setInteracted(true);
      }
      useEffect(() => {
            !display &&
            setStars(stars => ({
                  ...stars,
                  [title]: rating
            }));
      }, [display, rating, setStars, title]);

      const handlePreviewRating = (i) => {
            !display &&
            setPreviewRating(i + 1)
      }

      const resetPreviewRating = () => {
            !display &&
            setPreviewRating(0);
      }

      for(let i = 0; i < 5; i++) {
            stars.push(
                  <RatingStar 
                        icon={faStar} 
                        style={{margin: '0 5px'}} 
                        onPointerDown={() => handleRating(i)} 
                        onMouseEnter={() => handlePreviewRating(i)}
                        onMouseLeave={() => resetPreviewRating()}
                        $active={rating >= i + 1 || displayRating >= i + 1 ? true : false}
                        $previewactive={ previewRating >= i + 1 ? true : false}
                        $highlight={!interacted && highlight && filledArr[title] === false}
                        $display={display}
                        key={i}
                  />
            )
      }

      return (
            <div 
                  
                  style={{
                        width: '100%', 
                        height: '100%', 
                        display: 'flex', 
                        flexDirection: `${collapse ? 'column' : 'row'}`, 
                        justifyContent: 'space-between',
                        flexShrink: '1'
                  }}
            >
            {
                  collapse &&
                  <HR/>
            }
            
                  <Text style={{marginBottom: `${collapse ? '10px' : '0'}`}}>{title}</Text>
                  
                  {
                        <div 
                              style={{
                                    height: '100%', 
                                    width: '50%', 
                                    display: 'flex',  
                                    alignItems: 'center',
                                    
                              }}
                        >
                        {
                              stars.map(el => el)
                        }
                        </div>

                  }
            </div>
      )
}

export default Rating
