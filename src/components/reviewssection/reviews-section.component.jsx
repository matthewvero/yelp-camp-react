import React, { useEffect, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import { ContentContainer } from '../misc/containers.styles'
import { SubTitle, Text } from '../misc/text.styles'
import Review from '../review/review.component'
import {CommunityContentSection} from '../../components/misc/containers.styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons'
import { ReviewSectionGrid, ReviewsSectionSlide } from './reviews-section.styles'
import ReviewCreator from '../reviewcreator/review-creator.component'
import { getReviews } from '../../firebase.utils'

const ReviewsSection = ({campsiteID, user}) => {
      const [creating, setCreating] = useState(false);
      const [reviews, setReviews] = useState([])

      useEffect(() => {
            const fetchReviews = async () => {
                  const reviewData = await getReviews(campsiteID);
                  setReviews(reviewData)
            }
            fetchReviews()
      }, [campsiteID])


     


      return (
            <ContentContainer style={{padding: '10px'}}>
                  <ReviewSectionGrid>
                  
                  <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxSizing: 'border-box', gridRow: '1/2'}}>
                  <SubTitle>Reviews</SubTitle>
                        <div 
                        style={{
                              height: '40px', 
                              width: '40px', 
                              backgroundColor: `${creating ? 'crimson' : 'dodgerblue'}`, 
                              borderRadius: '10px',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              cursor: 'pointer'
                        }}
                              onPointerDown={() => setCreating(creating => !creating)}
                        >
                              <FontAwesomeIcon icon={creating ? faTimes : faPen} style={{color: 'white', fontSize: '1.5rem'}}/>
                        </div>
            </div>

                  <CommunityContentSection style={{height: '100%', position: 'relative', gridRow: '2/3'}}>
                        <CSSTransition
                              in={!creating}
                              classNames='reviewSection'
                              timeout={200}
                              unmountOnExit
                        >
                              <ReviewsSectionSlide>
                                    {     
                                          reviews.length ? 
                                          reviews.map((el, idx) => (
                                                <Review review={el} key={idx}/>
                                          ))
                                          : 
                                          <Text style={{textAlign: 'center'}}>No Reviews Yet...</Text>
                                    }
                                    
                              </ReviewsSectionSlide>
                        </CSSTransition>
                        <CSSTransition
                              in={creating}
                              classNames='reviewSection'
                              timeout={200}
                              unmountOnExit
                        >
                              <ReviewsSectionSlide>
                                    <ReviewCreator campsiteID={campsiteID} user={user}/>
                              </ReviewsSectionSlide>
                        </CSSTransition>
                  </CommunityContentSection>
                  </ReviewSectionGrid>
            </ContentContainer>
      )
}

export default ReviewsSection
