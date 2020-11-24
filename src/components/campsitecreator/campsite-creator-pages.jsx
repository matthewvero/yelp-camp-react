import { faCamera, faChevronLeft, faChevronRight, faPlus, } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import Button from '../button/button.component'
import ProgressIndicator from '../progressindicator/progressindicator.component'
import { CampsiteCreatorHoverEffect, CampsiteCreatorImageInput, CampsiteCreatorInput, CampsiteCreatorPage } from './campsite-creator.styles'
import {CreatorAPI} from './campsite-creator.component'
import InputImage from '../inputs/input-image/input-image.component'

export const CampsiteCreatorStart = () => {
      // Access the campsitecreator hooks and state
      const api = useContext(CreatorAPI)
      const themeContext = useContext(ThemeContext);
      return (
            

            <CampsiteCreatorPage style={{}} onClick={() => api.setActivePage('create')}>
                  <CampsiteCreatorHoverEffect>
                        <span 
                              style={{ 
                                    width: '70%', 
                                    fontSize: '2rem', 
                                    color: themeContext.textAlt, 
                                    cursor: 'pointer', 
                                    display: 'flex', 
                                    justifyContent: 'space-around', 
                                    alignItems: 'center'
                              }}
                        >
                              Create New Campsite 
                              <FontAwesomeIcon style={{color: themeContext.color}} icon={faPlus}/> 

                        </span>
                  </CampsiteCreatorHoverEffect>

            </CampsiteCreatorPage>

      )
}


export const CampsiteCreatorCreate = () => {
      // Access the campsitecreator hooks and state
      const api = useContext(CreatorAPI)
      const { handleReset, handleConfirm, previewImage, setPreviewImage, image, setImage, title, setTitle, price, setPrice, description, setDescription} = api;
      const themeContext = useContext(ThemeContext);
      return (

            <CampsiteCreatorPage style={{padding: '0'}} >
            
                  <div style={{
                        height: '100%', 
                        padding: '10px', 
                        boxSizing: 'border-box', 
                        width: '100%', 
                        display: 'grid', 
                        gridTemplateColumns: '25% auto 20%', 
                        gridTemplateRows: '30% auto', 
                        gap: '1rem'
                  }}>
                  
                        {
                              image === undefined ?
                              <CampsiteCreatorImageInput htmlFor='image'>      
                                    <FontAwesomeIcon icon={faCamera} style={{fontSize: '3rem'}}/>
                              </CampsiteCreatorImageInput>
                              :
                              <div style={{
                                    gridRow: '1 / 3',
                                    borderRadius: '10px', 
                                    overflow: 'hidden'
                              }} >
                                    <img 
                                          style={{
                                                height: '100%', 
                                                width: '100%', 
                                                borderRadius: '10px', 
                                                overflow: 'hidden'
                                          }} 
                                          alt='Your campground' 
                                          src={previewImage}
                                    />
                              </div>
                              
                        }                                

                        <InputImage id='image' setImageFn={setImage} setPreviewImageFn={setPreviewImage}/>
            
                        <CampsiteCreatorInput 
                              placeholder='Title' 
                              value={title} 
                              onChange={e => setTitle(e.target.value)}
                        />
                        
                        <CampsiteCreatorInput 
                              type='number' 
                              placeholder='Price' 
                              value={price} 
                              onChange={e => setPrice(e.target.value)}
                              min="0"
                              step='5' 
                        />
                        
                        <textarea 
                              rows="3" 
                              placeholder='Description'
                              style={{
                                    width: '100%',
                                    border: 'none', 
                                    outline: 'none', 
                                    backgroundColor: themeContext.background, 
                                    borderRadius: '10px', 
                                    padding: '10px',
                                    resize: 'none',
                                    fontFamily: 'Helvetica, sans-serif',
                                    color: themeContext.textAlt,
                                    fontSize: '1.3rem',
                                    boxSizing: 'border-box'
                              }}
                              value={description} 
                              onChange={e => setDescription(e.target.value)}
                        />
                        
                        <div style={{gridColumn: '3/4', gridRow: '2/3'}}>
                              <Button
                                    styles={{width: '100%', height: '45%', marginBottom: '5%'}}
                                    fn={handleReset}
                              >
                                    <FontAwesomeIcon style={{color: 'red'}} icon={faChevronLeft}/> Cancel
                              </Button>
                              <Button
                                    styles={{width: '100%', height: '45%'}}
                                    fn={handleConfirm}
                              >
                                    Review <FontAwesomeIcon style={{color: themeContext.color}} icon={faChevronRight}/>
                              </Button>
                        </div>
                  </div>
                              
            </CampsiteCreatorPage>

      )
}

export const CampsiteCreatorReview = () => {
      const api = useContext(CreatorAPI)
      const {loading, previewImage, description, handleBack, handleSubmit, price, progress, title} = api;
      const themeContext = useContext(ThemeContext);
      return (

            <CampsiteCreatorPage >
            {!loading ?
                  <div style={{
                        height: '100%', 
                        padding: '10px', 
                        boxSizing: 'border-box', 
                        width: '100%', 
                        display: 'grid', 
                        gridTemplateColumns: '25% auto 20%', 
                        gridTemplateRows: '30% auto', 
                        gap: '1rem',
                  }}>
                        
                        <div style={{
                              gridRow: '1 / 3',
                              borderRadius: '10px', 
                              overflow: 'hidden'
                        }} >
                              <img style={{
                                    height: '100%', 
                                    width: '100%', 
                                    borderRadius: '10px', 
                                    overflow: 'hidden'
                                    }} 
                                    alt='Your campground' 
                                    src={previewImage}
                              />
                        </div>

                        <h2
                                    style={{gridColumn: '2/3', color: themeContext.textAlt, textAlign: 'left'}}
                        >
                              {title}
                        </h2>

                        <div style={{gridColumn: '2/3', gridRow: '2/3', overflow: 'scroll'}}>
                        
                              <p style={{color: themeContext.textAlt, textAlign: 'left', margin: '0'}}>
                                    {description}
                              </p>
                        </div>

                        <h2 style={{color: themeContext.color, alignSelf: 'start'}}>
                              £{price} /Night
                        </h2>
                        
                        <div style={{gridColumn: '3/4', gridRow: '2/3'}}>
                              <Button
                                    styles={{width: '100%', height: '45%', marginBottom: '5%'}}
                                    fn={handleBack}
                              >
                                    <FontAwesomeIcon style={{color: 'red'}} icon={faChevronLeft}/> Go back 
                              </Button>
                              <Button
                                    styles={{width: '100%', height: '45%'}}
                                    fn={handleSubmit}
                              >
                                    Create <FontAwesomeIcon style={{color: themeContext.color}} icon={faChevronRight}/>
                              </Button>
                        </div>
                  </div>
                  :						
                        <ProgressIndicator size={120} radius={52} percent={progress}/>
                  }
            
            </CampsiteCreatorPage>

      )
}
