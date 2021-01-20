import { faPaperPlane, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { addComment } from '../../firebase.utils';
import { useCommentListener } from '../../utils/comment-hooks';
import Comment from '../comment/comment.component';
import { FormInputText } from '../inputs/input-text/inputs.styles';
import { CommunityContentSection, ContentContainer } from '../misc/containers.styles';
import { CommentSectionGrid } from './comment-section.styles'

const CommentSection = ({campsiteID, userID}) => {
      const [commentInput,setCommentInput] = useState('');
      const comments = useCommentListener(campsiteID);
      
	const handleCommentSubmit = () => {
		addComment(userID, commentInput, campsiteID);
		setCommentInput('');
      }



      // useEffect(() => {
	// 	const getUsername = async () => {
	// 		const userRef = await db.collection('userProfiles').doc(campsite.owner).get()
	// 		const user = userRef.data()
	// 		// finish this
	// 	}
	// 	campsite &&
	// 	getUsername()
		
	// }, [campsite])

      return (
            <ContentContainer style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: "center", padding: '10px'}}>
                  <CommentSectionGrid>
                        <div 
                              style={{
                                    display: 'flex', 
                                    gridRow: '1/2',
                                    gridColumn: '1/2'
                              }}
                        >
                        
                        <FormInputText 
                              placeholder='Add a Comment...' 
                              style={{
                                    width: '90%', 
                                    padding: '15px 20px', 
                                    justifySelf: 'flex-start',
                                    borderTopRightRadius: '0',
                                    borderBottomRightRadius: '0',
                                    boxSizing: 'border-box',
                              }}
                              value={commentInput}
                              onChange={e => setCommentInput(e.target.value)}
                              onKeyDown={e => e.key === 'Enter' && handleCommentSubmit()}
                        />
                        {
                              commentInput ? 
                              <div
                                    style={{
                                          height: '100%',
                                          width: '10%',
                                          backgroundColor: 'dodgerblue',
                                          borderTopRightRadius: '10px',
                                          borderBottomRightRadius: '10px',
                                          display: "flex",
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          cursor: 'pointer',
                                    }}
                                    onPointerDown={() => handleCommentSubmit()}
                              >
                                    <FontAwesomeIcon icon={faPaperPlane} style={{color: "white", fontSize: '1.7rem', }}/>
                              </div>
                              :
                              <div
                                    style={{
                                          height: '100%',
                                          width: '10%',
                                          backgroundColor: 'grey',
                                          borderTopRightRadius: '10px',
                                          borderBottomRightRadius: '10px',
                                          display: "flex",
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          cursor: 'pointer',
                                    }}
                              >
                                    <FontAwesomeIcon icon={faPen} style={{color: "white", fontSize: '1.7rem', }}/>
                              </div>
                        }
                        </div>
                        <CommunityContentSection style={{gridRow: '2/3'}}>
                              {
                                    comments.map((el, idx) => (
                                          <Comment key={idx} data={el} userID={userID}/>
                                    ))
                              }
                              
                        </CommunityContentSection>
                  </CommentSectionGrid>
            </ContentContainer>
      )
}

export default CommentSection
