import { useEffect, useState } from "react";
import {db} from '../firebase';

export function useCommentListener(campsiteID) {
      const [comments, setComments] = useState([]);
      useEffect(() => {
            const queryRef = db.collection('comments').where('campsiteID', '==', campsiteID);
            const unsub = queryRef.onSnapshot(snapshot => {
                  const commentArr = snapshot.docs.map(el => el.data());
                  
                  setComments(commentArr)
            })
            return () => {
                  unsub()
            }
      }, [campsiteID])
      return comments
}