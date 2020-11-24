import React, { useContext, useEffect, useState } from 'react'
import { ContentContainer, ResponsiveContainer } from '../../components/misc/containers.styles'
import { PageContainer } from '../page.styles'
import ProfilePicture from '../../components/profilepicture/profilepicture.component'
import { ThemeContext } from 'styled-components'
import CampsiteCreator from '../../components/campsitecreator/campsite-creator.component'
import { db } from '../../firebase'
import { useSelector } from 'react-redux'
import CampsiteCardLong from '../../components/campsitecardlong/campsite-card-long.component'
import CoverPicture from '../../components/coverpicture/coverpicture.component'
import { getUserCampsites } from '../../firebase.utils'
const ProfilePage = () => {

      const user = useSelector(state => state.authReducer.user);
      const userProfile = useSelector(state => state.authReducer.userProfile);
      const themeContext = useContext(ThemeContext);
      const [camps, setCamps] = useState();

      useEffect(() => {
            const unsub = getUserCampsites(setCamps)
            if(unsub) {
                  return(() => unsub())
            }
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

                        <CoverPicture/>
                        
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

                              <ProfilePicture />
                              
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
