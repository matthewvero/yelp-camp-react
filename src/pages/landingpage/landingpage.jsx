import { faMountain } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Button from '../../components/button/button.component'
import ImageCarousel from '../../components/imagecarousel/imagecarousel.component'
import { LandingPageContainer } from './landingpage.styles'



const LandingPage = ({history}) => {

      

      return (
            <LandingPageContainer>
                  <ImageCarousel/>
                  <div style={{position: 'absolute', zIndex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'rgba(23,24,25, 0.5)', padding: '20px', borderRadius: '15px'}}>
                        <h1 style={{color: 'white', fontSize:'3rem'}}>
                              Welcome To YelpCamp <FontAwesomeIcon icon={faMountain}/>
                        </h1>
                        <Button 
                              fn={() => history.push('home')}
                        >
                              View Campsites
                        </Button>
                  </div>
            </LandingPageContainer>
      )
}

export default LandingPage
