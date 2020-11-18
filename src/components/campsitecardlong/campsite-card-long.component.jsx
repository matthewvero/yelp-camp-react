import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from 'styled-components';
import { storage } from '../../firebase';
import Image from '../image/image.component';
import { ContentContainer } from '../misc/containers.styles'

const CampsiteCardLong = ({campsite}) => {
      const themeContext = useContext(ThemeContext);
      const [image, setImage] = useState();

      useEffect(() => {
            const getImage = async () => {
                  const storageRef = storage.ref();
                  const listRef = await storageRef.child(`/images/${campsite.id}`).listAll()
                  setImage(await listRef.items[0].getDownloadURL())
            }
            getImage()
      }, [campsite.id])

      return (
            <ContentContainer style={{width: '100%', height: '200px', margin: '5px'}}>
                                          
                  <div style={{
                        height: '100%', 
                        width: '100%',
                        padding: '10px', 
                        boxSizing: 'border-box', 
                        display: 'grid', 
                        gridTemplateColumns: '25% auto 20%', 
                        gridTemplateRows: '30% auto', 
                        gap: '1rem',
                        
                  }}>
                        
                        <div style={{
                              gridRow: '1 / 3',
                              borderRadius: '10px', 
                              overflow: 'hidden',
                        }} >
                            <Image image={image}/>  
                        </div>

                        <h2
                                    style={{gridColumn: '2/3', color: themeContext.textAlt, textAlign: 'left'}}
                        >
                              {campsite.title}
                        </h2>

                        <div style={{gridColumn: '2/3', gridRow: '2/3', overflow: 'scroll'}}>
                        
                              <p style={{color: themeContext.textAlt, textAlign: 'left', margin: '0'}}>
                                    {campsite.description}
                              </p>
                        </div>

                        <h2 style={{color: themeContext.color, alignSelf: 'start'}}>
                              £{campsite.price} /Night
                        </h2>
                        
                  </div>
            </ContentContainer>
      )
}

export default CampsiteCardLong
