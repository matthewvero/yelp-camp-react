import React, { useContext } from 'react'
import { Container, CoverPicture } from '../../components/misc/containers.styles'
import { PageContainer } from '../page.styles'
import {ProfilePicture} from '../../components/misc/containers.styles'
import { ThemeContext } from 'styled-components'
import { EditButton } from './profilepage.styles'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CampsiteCreator from '../../components/campsitecreator/campsite-creator.component'
const ProfilePage = () => {
      const themeContext = useContext(ThemeContext)
      return (
            <PageContainer>
                  <Container 
                        style={{
                              height: '300px', 
                              width: '70vw', 
                              marginTop: '20px', 
                              position: 'relative'
                        }}
                  >
                        <EditButton style={{borderRadius: '50%'}}>

                              <FontAwesomeIcon icon={faCamera}/>

                        </EditButton>

                        <CoverPicture src='https://images.unsplash.com/photo-1465188466731-618dfc07a57d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80'/>
                        
                        <div 
                              style={{
                                    height: '200px', 
                                    width: '200px', 
                                    position: 'absolute', 
                                    left: '5%', 
                                    bottom: '-30%', 
                                    zIndex: '1'
                              }}
                        >

                              <ProfilePicture src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80'/>
                              
                              <EditButton style={{borderRadius: '50%'}}>

                                    <FontAwesomeIcon icon={faCamera}/>

                              </EditButton>
                        </div>
                        
                        </Container>
                        
                        <Container 
                              style={{
                                    minHeight: '100px', 
                                    width: '70vw', 
                                    position: 'relative', 
                                    margin: '10px'
                              }}
                        >
                        <h1 style={{color: themeContext.textAlt}}> Melanie Barber </h1>
                  </Container>

                  <div 
                        style={{
                              height: 'auto', 
                              width: '70vw', 
                              display: 'flex', 
                              justifyContent: 'space-between'
                              }}
                        >
                        <Container 
                              style={{
                                    height: '200px', 
                                    width: '30%', 
                                    alignItems: 'start', 
                                    padding: '20px', 
                                    justifyContent: 'start', 
                                    color: themeContext.textAlt
                                    }}
                              >
                              <div style={{margin: '10px 0'}}>
                                    <h2 style={{margin: '0'}}>About</h2>
                              </div>
                              <div style={{
                                    display: 'flex', 
                                    flexDirection:'column', 
                                    alignItems: 'start', 
                                    justifyContent: 'space-between', 
                                    width: '100%', 
                                    height: '100%'
                              }}>
                                    <h3 style={{fontWeight: '600', margin: '0'}}> Bio: </h3>

                                    <p>hello</p>

                                    <div style={{display: 'flex'}}>

                                          <h3 style={{fontWeight: '600', margin: '0'}}> Joined: June </h3> 

                                    </div>
                                    <div style={{display: 'flex'}}>

                                          <h3 style={{fontWeight: '600', margin: '0'}}> From: LA </h3> 

                                    </div>
                              </div>
                        </Container>
                        <div 
                              style={{
                                    width: '65%', 
                                    height: 'auto', 
                                    display: 'flex', 
                                    flexDirection: 'column', 
                                    alignItems: 'center', 
                                    overflow: 'scroll'
                              }}
                        >
                              <CampsiteCreator></CampsiteCreator>
                        </div>
                  </div>
            </PageContainer>
      )
}

export default ProfilePage
