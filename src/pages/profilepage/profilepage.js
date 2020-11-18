import React, { useContext, useEffect, useState } from 'react'
import { ContentContainer, CoverPicture, ResponsiveContainer } from '../../components/misc/containers.styles'
import { PageContainer } from '../page.styles'
import {ProfilePicture} from '../../components/misc/containers.styles'
import { ThemeContext } from 'styled-components'
import { EditButton } from './profilepage.styles'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CampsiteCreator from '../../components/campsitecreator/campsite-creator.component'
import { db } from '../../firebase'
import { useSelector } from 'react-redux'
import CampsiteCardLong from '../../components/campsitecardlong/campsite-card-long.component'
const ProfilePage = () => {
      const user = useSelector(state => state.authReducer.user);
      const userProfile = useSelector(state => state.authReducer.userProfile);
      const themeContext = useContext(ThemeContext);
      const [camps, setCamps] = useState();
      console.log(user)
      useEffect(() => {
            const getUserCampsites = () => {
                  if(user.hasOwnProperty('uid')){
                        const campsites = db.collection('campsites').where('owner', '==', user.uid);
                        const unsub = campsites.onSnapshot(snapshot => {
                              const campsitesArr = [];
                              snapshot.forEach(el => {
                                    campsitesArr.push(el.data());
                              })
                              setCamps(campsitesArr);
                        });
                  return unsub
                  }
            }
            const unsubscribe = getUserCampsites()
            if(unsubscribe) { return(() => unsubscribe())}
      }, [user])
      return (
            <PageContainer>
                  <ResponsiveContainer 
                        style={{
                              height: '300px', 
                              marginTop: '10px', 
                              position: 'relative',
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
                        
                  </ResponsiveContainer>
                        
                        <ResponsiveContainer>
                              <ContentContainer
                                    style={{
                                          minHeight: '100px', 
                                          position: 'relative', 
                                    }}
                              >
                                    <h1 style={{color: themeContext.textAlt}}> {user.displayName} </h1>
                              </ContentContainer>
                        </ResponsiveContainer>

                        <ResponsiveContainer 
                              style={{
                                    height: 'auto', 
                                    display: 'flex', 
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'start'
                              }}
                        >
                              <ContentContainer 
                                    style={{
                                          height: '300px', 
                                          width: '34%', 
                                          alignItems: 'start', 
                                          padding: '20px', 
                                          justifyContent: 'start', 
                                          color: themeContext.textAlt,
                                    }}
                              >

                                    <div style={{margin: '10px 0'}}>
                                          <h2 style={{margin: '0'}}>About</h2>
                                    </div>

                                    <div 
                                          style={{
                                                display: 'flex', 
                                                flexDirection:'column', 
                                                alignItems: 'start', 
                                                justifyContent: 'space-between', 
                                                width: '100%', 
                                                height: '100%'
                                          }}
                                    >

                                          <h3 style={{fontWeight: '600', margin: '0'}}> Bio: </h3>

                                          <p>hello</p>

                                          <div style={{display: 'flex'}}>

                                                <h3 style={{fontWeight: '600', margin: '0'}}> Joined: June </h3> 

                                          </div>
                                          <div style={{display: 'flex'}}>

                                                <h3 style={{fontWeight: '600', margin: '0'}}> From: LA </h3> 

                                          </div>
                                    </div>
                              </ContentContainer>


                              <div 
                                    style={{
                                          width: '65%', 
                                          height: 'auto', 
                                          display: 'flex', 
                                          flexDirection: 'column', 
                                          alignItems: 'center', 
                                    }}
                              >

                                    <CampsiteCreator/>

                                    <div style={{
                                          display: 'flex', 
                                          flexDirection:'column', 
                                          alignItems: 'center', 
                                          justifyContent: 'space-between', 
                                          width: '100%', 
                                          overflow: 'scroll',
                                    }}>
                                    {
                                          camps &&
                                          camps.map(el => (
                                                
                                                <CampsiteCardLong campsite={el} key={el.id} />
                                          ))
                                    }
                                    </div>
                              </div>

                        </ResponsiveContainer>
            </PageContainer>
      )
}

export default ProfilePage
