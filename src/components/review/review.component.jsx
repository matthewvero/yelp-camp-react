import { faChevronDown, faChevronUp, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import { HR } from '../misc/containers.styles'
import { SubText, SubTitle, Text } from '../misc/text.styles'
import Rating from '../rating/rating-component'
import { RatingsGrid } from '../reviewcreator/review-creator.styles'
import { RatingBar, RatingSection, ReviewContainer, RatingBarPercentage } from './review.styles'
import { useDebounce } from '../../utils/misc-hooks'
import { useGetUsername } from '../../utils/auth-hooks'

const Review = ({review}) => {
      const [averageRating, setAverageRating] = useState(0);
      const [expanded, setExpanded] = useState(false);
      const [categories, setCategories] = useState({});
      const [collapse, setCollapse] = useState(false);
      const reviewRef = useRef();
      const username = useGetUsername(review.userID);
      useEffect(() => {
            const {ratings} = review.data;
            const ratingSum = Object.keys(ratings).reduce((prev, cur) => prev + ratings[cur], 0);
            const numOfCategories = Object.keys(ratings).length
            setAverageRating((ratingSum / numOfCategories)); 
            setCategories(Object.keys(ratings))
      }, [review])

      const handleResize = () => {
            setCollapse(reviewRef.current.offsetWidth < 600);
      }


           
      const debounceResize = useDebounce(handleResize, 100)
       
      useEffect(() => {
            handleResize()
            window.addEventListener('resize', debounceResize);
            return (() =>{
                  window.removeEventListener('resize', debounceResize);
            })
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])

      return (
            <React.Fragment>
            <ReviewContainer expanded={expanded} ref={reviewRef} collapse={collapse}>
                  <div style={{display: 'flex', height: '30px'}}>
                        <SubTitle>{review.data.heading}</SubTitle>
                        
                  </div>
                  <Text 
                        style={{
                              gridColumn: '1/2', 
                              gridRow: '2/3', 
                              textOverflow: 'ellipsis',  
                              overflowY: `${expanded ? 'scroll' : 'hidden'}`, 
                              whiteSpace: `${expanded ? 'normal' : 'nowrap'}`
                        }}
                  >
                        {review.data.body}
                  </Text>

                  <RatingSection >
                  <Text style={{color: '#666666'}}>{username}</Text>
                  <div style={{width: '100%', height: 'auto', paddingTop: '10px', display: 'grid', gridTemplateColumns: '1fr 1fr 8fr', gap: '5px'}}>
                  
                        <FontAwesomeIcon icon={faStar} style={{color: 'white', marginRight: '5%', gridColumn: '1/2', filter: 'drop-shadow(0 0 1px black)'}}/>
                        <SubText style={{ maxHeight: '100%', gridColumn: '2/3', display: 'inline-block', verticalAlign: 'middle'}}>{averageRating.toFixed(1)}</SubText>
                        <div style={{gridColumn: '3/4', position: 'relative', display: 'flex', alignItems: 'center'}}>
                        <RatingBar/>
                        <RatingBarPercentage percentage={averageRating * 20}/>
                        </div>
                  </div>
                  {
                        expanded ? 
                        <Text style={{margin: '10px 0', userSelect: 'false', cursor: 'pointer'}} onPointerDown={() => setExpanded(false)}>Less <FontAwesomeIcon icon={faChevronUp}/></Text>
                        :
                        <Text style={{margin: '10px 0', userSelect: 'false', cursor: 'pointer'}} onPointerDown={() => setExpanded(true)}>More <FontAwesomeIcon icon={faChevronDown}/></Text>
                  }
                  </RatingSection>
                  <RatingsGrid style={{gridColumn: '1/3', gridRow: '3/4'}}>
                              {
                                    categories.length && 
                                    categories.map((el, idx) => (
                                          
                                          <Rating title={el} key={idx} display displayRating={review.data.ratings[el]} collapse={collapse}/>
                                          
                                    ))
                              }
                  </RatingsGrid>
            </ReviewContainer>
            <HR/>
            </React.Fragment>
      )
}

export default Review
