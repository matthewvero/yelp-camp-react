import { faCamera, faChevronRight, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import { ThemeContext } from 'styled-components'
import Button from '../button/button.component'
import { CampsiteCreatorContainer, CampsiteCreatorImageInput, CampsiteCreatorInput, CampsiteCreatorPage } from './campsite-creator.styles'

const CampsiteCreator = () => {
      const themeContext = useContext(ThemeContext);
      const [activePage, setActivePage] = useState('start')
      const [title, setTitle] = useState('');
      const [description, setDescription] = useState();
      const [price, setPrice] = useState('');
	const [image, setImage] = useState();
	const [formValid, setFormValid] = useState(false);

      const handleConfirm = () => {
            title && description && price && image && setFormValid(true)
		formValid ? setActivePage('location') : alert('Please fill out all inputs before proceeding.');
      }

      return (
            <CampsiteCreatorContainer $width={'100%'} $height={'200px'}>

                  <CSSTransition
                        in={activePage === 'start' }
                        classNames="page"
                        timeout={100}
                        unmountOnExit

                  >

                        <CampsiteCreatorPage onClick={() => setActivePage('create')}>

                              <span 
                                    style={{ width: '70%', fontSize: '2rem', color: themeContext.textAlt, cursor: 'pointer', display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}
                              >
                                    Create New Campsite 
                                    <FontAwesomeIcon style={{color: themeContext.color}} icon={faPlus}/> 

                              </span>
                        
                        </CampsiteCreatorPage>

                  </CSSTransition>
                  <CSSTransition
                        in={activePage === 'create' }
                        classNames="page"
                        timeout={100}
                        unmountOnExit

                  >

                        <CampsiteCreatorPage style={{justifyContent: 'start'}} >

                              {
                                    image === undefined ?
                                    <CampsiteCreatorImageInput htmlFor='image'>      
                                          <FontAwesomeIcon icon={faCamera} style={{fontSize: '3rem'}}/>
                                    </CampsiteCreatorImageInput>
                                    :
                                    <img style={{
                                                height: '175px', 
                                                width: '175px', 
                                                borderRadius: '10px', 
                                                overflow: 'hidden'
                                          }} 
                                          alt='Your campground' 
                                          src={image}
                                    />
                                    
                              }                                

                              <input 
                                    name='image' 
                                    id='image' 
                                    type='file' 
                                    style={{
                                          width: '0.1px',
                                          height: '0.1px',
                                          opacity: '0',
                                          overflow: 'hidden',
                                          position: 'absolute',
                                          zIndex: '-1'
                                    }}
                                    onChange={e => {
                                          setImage(URL.createObjectURL(e.target.files[0])) 
                                          
                                    }}
                              />
                              

                              <div 
                                    style={{
                                          display: 'flex', 
                                          flexDirection: 'row', 
                                          alignItems: 'space-between', 
                                          flexWrap: 'wrap',
                                          justifyContent: 'space-between', 
                                          padding: '12.5px 10px', 
                                          height: '100%', 
                                          width: '80%',
                                          boxSizing: 'border-box' 
                                    }}
                              >
                                    <CampsiteCreatorInput 
                                          placeholder='Title' 
                                          value={title} 
                                          onChange={e => setTitle(e.target.value)}
                                    />
                                    <CampsiteCreatorInput 
                                          style={{width: '25%'}} 
                                          type='number' 
                                          placeholder='Price' 
                                          value={price} 
                                          onChange={e => setPrice(e.target.value)}
                                    />
                                    <textarea 
                                          rows="3" 
                                          placeholder='Description'
                                          style={{
                                                width: '70%',
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
                                    <div>
                                          
                                    </div>
                                    <Button
                                          styles={{width: '25%'}}
                                          fn={handleConfirm}
                                    >
                                          Confirm <FontAwesomeIcon style={{color: themeContext.color}} icon={faChevronRight}/>
                                    </Button>
                              </div>
                              
                        
                        </CampsiteCreatorPage>

                  </CSSTransition>
                  <CSSTransition
                        in={activePage === 'location' }
                        classNames="page"
                        timeout={100}
                        unmountOnExit

                  >
			     <CampsiteCreatorPage>

					<Button
						styles={{width: '25%'}}
						fn={handleConfirm}
					>
						Confirm <FontAwesomeIcon style={{color: themeContext.color}} icon={faChevronRight}/>
					</Button>
			     </CampsiteCreatorPage>
                  </CSSTransition>

            </CampsiteCreatorContainer>
      )
}

export default CampsiteCreator
