import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from 'styled-components'
import { Container } from '../../components/misc/containers.styles'
import { PageContainer } from '../page.styles'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMountain, faSearch} from '@fortawesome/free-solid-svg-icons'
import { FormInputText } from '../../components/inputs/input-text/inputs.styles'
import CampsiteCard from '../../components/campsitecard/campsite-card.component'
import { db } from '../../firebase'

const formStyles = {
      position: 'relative', 
      height: '100%', 
      display: 'flex', 
      alignItems: 'center'
}
const searchBarStyles = {
      width: '60vw', 
      height: '60px', 
      margin: '20px 0', 
      display: 'flex', 
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 5%'
}

const campsiteCardsContainerStyles = {
      width: '70vw', 
      display: 'flex', 
      flexDirection: 'row', 
      flexWrap: 'wrap', 
      justifyContent: 'flex-start', 
      alignItems: 'space-evenly'
}

const Homepage = () => {
      const themeContext = useContext(ThemeContext)
      const [campsites, setCampsites] = useState([])
      useEffect(() => {
            const getData = async () => {
                  let campsitesArr = []
                  const snapshot = await db.collection('campsites').get();
                  snapshot.forEach(doc => campsitesArr.push({data: doc.data(), id: doc.id}))
                  setCampsites(campsitesArr)
            }
            getData()
      }, [])

      return (
            <PageContainer>
                  <Container
                        $width='70vw'
                        $height='200px'
                        style={{marginTop: '20px', justifyContent: 'space-around', padding: '20px 0'}}
                  >
                        <h1 
                              style={{fontSize: '2.5rem', fontWeight: '400', color: themeContext.textAlt, margin: '0'}}
                        > 
                              Welcome To YelpCamp! <FontAwesomeIcon style={{color: themeContext.color}} icon={faMountain}/>
                        </h1>
                        <p 
                              style={{color: themeContext.textAlt}}
                        >
                              Take a look at our hand-picked campsites
                        </p>
                  </Container>
                  <Container
                        style={searchBarStyles}
                  >
                        <h2 
                              style={{
                                    color: themeContext.textAlt,
                                    fontWeight: '400'
                              }}>
                              Our most popular Campsites!
                        </h2>
                        <form
                              onSubmit={(e) => e.preventDefault()}
                              style={{
                                    height: '100%',
                                    width: 'auto',
                                    display: 'flex',
                                    alignItems: "center",
                              }}
                        >     
                              <div style={formStyles}>
                                    <FontAwesomeIcon icon={faSearch} style={{position: 'absolute', left: '5%', color: themeContext.textAlt}}/>
                                    <FormInputText style={{height: '70%'}} placeholder='Search Campsites...'/>
                              </div>
                        </form>
                  </Container>

                  <div style={campsiteCardsContainerStyles}>
                  
                        {
                              campsites.map(site => (

                                    <CampsiteCard campsite={site.data} key={site.id}/>
      
                              ))
                        }
                             
                              
                  
                  </div>

            </PageContainer>
      )
}

export default Homepage
