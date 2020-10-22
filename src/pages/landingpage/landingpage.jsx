import React from 'react'
import Button from '../../components/button/button.component'
import ImageCarousel from '../../components/imagecarousel/imagecarousel.component'
import { LandingPageContainer } from './landingpage.styles'



const LandingPage = ({history}) => {

      

      return (
            <LandingPageContainer>
                  <ImageCarousel/>
                  <div style={{position: 'absolute', zIndex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <h1 style={{color: 'white', fontSize:'3rem', filter: ' drop-shadow(1px 1px #222)'}}>
                              Welcome To YelpCamp 
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
