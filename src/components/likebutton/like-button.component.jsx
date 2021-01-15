import { faHeart } from '@fortawesome/free-solid-svg-icons';
import React from 'react'
import { likeCampsite } from '../../firebase.utils';
import { useLikeListener } from '../../utils/campsite-hooks';
import withTouchAnimator from '../touch-hoc/touch-hoc.component';
import { LikeButtonHeart } from './like-button.styles'

const LikeButton = ({campsite, user, style}) => {
      const LikeButtonHeartTouch = withTouchAnimator(LikeButtonHeart);
      const {liked} = useLikeListener(campsite, user);
      const handleLike = () => {
		likeCampsite(campsite.id, user.uid, liked);
	}
      return (
            <LikeButtonHeartTouch 
                  style={style} 
                  icon={faHeart} 
                  liked={liked ? 1 : 0}  
                  fn={handleLike} 
                  onClick={e => e.stopPropagation()}
            />
      )
}

export default LikeButton

