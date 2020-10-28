import { faHeart, faStar, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components';
import Button from '../button/button.component';
import { Container } from '../misc/containers.styles'
import { CampsiteCardContainer, CampsiteCardHeart, CampsiteCardImage } from './campsite-card.styles'

const image = 'https://images.unsplash.com/photo-1526491109672-74740652b963?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80';

const CampsiteCard = ({data}) => {
      const themeContext = useContext(ThemeContext)
      return (
            <CampsiteCardContainer style={{
                  height: 'auto', 
                  flexBasis: '30%', 
                  margin: '1.5%', 
                  justifyContent: 'space-between', 
                  alignItems: 'start',
                  overflow: 'hidden', 
                  position: 'relative'
            }}>
                  <CampsiteCardImage src={image}/>
                  <CampsiteCardHeart 
                        icon={faHeart} 
                        
                  />
                  <div style={{width: '100%', height: '100%', padding: '10px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'start'}}>
                        <span style={{color: themeContext.color}}><FontAwesomeIcon icon={faStar}/> 5.0</span>
                        <p
                              style={{
                              margin: '0', 
                              fontWeight: '400', 
                              color: themeContext.textAlt,
                              fontSize: '1.2rem'
                              }}
                        >
                              *Campsite Name*
                        </p>
                        <p style={{margin: '0', color: themeContext.textAlt}}>stuff</p>
                  </div>
            </CampsiteCardContainer>
      )
}

export default CampsiteCard
