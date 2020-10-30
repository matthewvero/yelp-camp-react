import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from 'styled-components';
import { CampsiteCardContainer, CampsiteCardHeart, CampsiteCardImage, LoadingImage } from './campsite-card.styles'

const CampsiteCard = ({campsite}) => {
      const [loading, setLoading] = useState(true);
      const [image, setImage] = useState();
      const themeContext = useContext(ThemeContext);
      const cardContentContainer = {
            width: '100%', 
            height: '100%', 
            padding: '10px 20px', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-around', 
            alignItems: 'start'
      }
      

      useEffect(() => {

            const imageData = new Image();
            imageData.onload = () => {
                  setImage(imageData.src);
                  setLoading(false);
            }
            imageData.src = campsite.image
            
      }, [campsite.image])

      return (
            <CampsiteCardContainer>
                  {
                        loading ?
                        <LoadingImage/> 
                        :
                        <CampsiteCardImage src={image}/>
                  }
                  
                        <CampsiteCardHeart 
                              icon={faHeart} 
                        />
                  
                  <div style={cardContentContainer} >

                        <span 
                        style={{color: themeContext.color}}
                        >
                              <FontAwesomeIcon icon={faStar}/> 
                    
                              {campsite.rating}

                        </span>
                        <p
                        style={{
                              margin: '0', 
                              fontWeight: '400', 
                              color: themeContext.textAlt,
                              fontSize: '1.2rem'
                        }}
                        >
                              {campsite.name}
                        </p>
                        
         
                        <p 
                        style={{
                              margin: '0', 
                              color: themeContext.textAlt
                        }}
                        >
                              {campsite.description}
                        </p>
                  
                        </div>
            </CampsiteCardContainer>
      )
}

export default CampsiteCard
