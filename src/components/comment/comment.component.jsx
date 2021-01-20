import React, { useEffect, useState } from 'react'
import { db } from '../../firebase';
import { HR } from '../misc/containers.styles';
import { Text } from '../misc/text.styles'

const Comment = ({data, userID}) => {
      // const [editing, setEditing] = useState(false);
      // Finish this
      const [username, setUsername] = useState('');
      useEffect( () => {
            const getUsername = async () => {
                  const query = await db.collection('userProfiles').where('userID', '==', userID).get();
                  setUsername(query.docs[0].data().displayName)
            }
            getUsername()
      }, [userID])
      return (
            <React.Fragment>
                  <div style={{height: 'auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', width: '100%'}}>
                        <Text>{data.comment} <span style={{color: '#999999'}}>- {username}</span></Text>
                        

                        {
                              userID === data.user &&
                              <div style={{marginLeft: 'auto'}}>
                                    Edit Delete
                              </div>
                        }
                  </div>
                  <HR/>
            </React.Fragment>
      )
}

export default Comment
