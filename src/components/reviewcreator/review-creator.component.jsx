import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from 'styled-components'
import { addReview } from '../../firebase.utils'
import { FormInputText, FormInputTextArea } from '../inputs/input-text/inputs.styles'
import Rating from '../rating/rating-component'
import { RatingsGrid, ReviewCreatorGrid } from './review-creator.styles'

const ReviewCreator = ({campsiteID, user}) => {
      const themeContext = useContext(ThemeContext);
      const [ratings, setRatings] = useState({})
      const [filled, setFilled] = useState({
            'Accuracy': false,
            'Check-in': false,
            'Cleanliness': false,
            'Communication': false,
            'Location': false,
            'Value': false
      });
      const [sendable, setSendable] = useState(false);
      const [allRatingsFilled, setAllRatingsFilled] = useState(false);
      const [body, setBody] = useState('')
      const [heading, setHeading] = useState('')
      const [highlight, setHighlight] = useState(false);
      const [errorBody, setErrorBody] = useState(false);
      const [errorHeading, setErrorHeading] = useState(false);
      const handleSubmit = () => {
            setHighlight(true);
            if (sendable) {
                  addReview(user, campsiteID, {
                        heading,
                        body,
                        ratings
                  })
            } 
            if (heading.length < 10) {
                  setErrorHeading(true);
            }
            if (body.length < 10) {
                  setErrorBody(true);
            }
            
      }

      useEffect(() => {
            if (allRatingsFilled && body.length > 10 && heading.length > 10) {
                  setSendable(true)
            } 
      }, [allRatingsFilled, body, heading])

      useEffect(() => {
            // Check each rating has been filled in
            for (const category in ratings) {
                  const isTrue = ratings[category] >= 1;
                  setFilled(filled => ({
                        ...filled,
                        [category]: isTrue
                  }))
            }

      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [ratings])

      useEffect(() => {
            setAllRatingsFilled(Object.keys(filled).every(e => filled[e] === true));
      }, [filled])

      useEffect(() => {
            if (errorHeading && heading.length >= 10){
                  setErrorHeading(false)
            }
            if (errorBody && body.length >= 10){
                  setErrorBody(false)
            }
      }, [body, errorBody, errorHeading, heading])

      return (
            <form style={{width: '100%', height: '100%'}}>
                  <ReviewCreatorGrid>
                        <div 
                        style={{
                              gridColumn: '3/4', 
                              gridRow: '1/2',
                              justifySelf: 'end',
                              height: '40px', 
                              width: '40px', 
                              backgroundColor: `${sendable ? 'dodgerblue' : 'grey'}`, 
                              borderRadius: '10px',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              cursor: 'pointer',
                              
                        }}
                              onPointerDown={() => handleSubmit()}
                        >
                              <FontAwesomeIcon icon={faPaperPlane} style={{color: 'white', fontSize: '1.5rem'}}/>
                        </div>
                        <FormInputText 
                              placeholder='Heading...' 
                              style={{
                                    padding: '8px', 
                                    borderRadius: '10px', 
                                    gridColumn: '1/3', 
                                    border: `solid 2px ${errorHeading ? 'crimson' : themeContext.background}`
                              }}
                              value={heading}
                              onChange={e => setHeading(e.target.value)}
                              />
                        <FormInputTextArea 
                              style={{
                                    padding: '8px', 
                                    borderRadius: '10px', 
                                    gridRow: '2/3', 
                                    gridColumn: '1/4', 
                                    border: `solid 2px ${errorHeading ? 'crimson' : themeContext.background}`

                              }} 
                              placeholder='Body...'
                              value={body}
                              onChange={e => setBody(e.target.value)}
                        />
                              
                        <RatingsGrid>
                              <Rating title='Cleanliness' setStars={setRatings} highlight={highlight} filledArr={filled}/>
                              <Rating title='Communication' setStars={setRatings} highlight={highlight} filledArr={filled}/>
                              <Rating title='Check-in' setStars={setRatings} highlight={highlight} filledArr={filled}/>
                              <Rating title='Accuracy' setStars={setRatings} highlight={highlight} filledArr={filled}/>
                              <Rating title='Location' setStars={setRatings} highlight={highlight} filledArr={filled}/>
                              <Rating title='Value' setStars={setRatings} filledArr={filled} highlight={highlight}/>
                        </RatingsGrid>
                  </ReviewCreatorGrid>
            </form>
      )
}

export default ReviewCreator
