import React, { createContext, useState } from 'react';
import {useSelector} from 'react-redux'
import {addCampsite } from '../../firebase'
import { CSSTransition } from 'react-transition-group';
import { CampsiteCreatorContainer } from './campsite-creator.styles';
import { CampsiteCreatorCreate, CampsiteCreatorReview, CampsiteCreatorStart } from './campsite-creator-pages';

const CampsiteCreator = () => {
      const [activePage, setActivePage] = useState('start')
      const [title, setTitle] = useState('');
      const [description, setDescription] = useState();
      const [price, setPrice] = useState('');
	const [image, setImage] = useState();
	const [previewImage, setPreviewImage] = useState();
	const [progress, setProgress] = useState(0)
	const [loading, setLoading] = useState(false)
	const user = useSelector(state => state.authReducer.user);
	
      const handleConfirm = () => {
            title && description && price && image ?
		 setActivePage('review') : alert('Please fill out all inputs before proceeding.');
	}

	const handleReset = () => {
		setActivePage('start');
		setTitle('');
		setDescription('')
		setPrice('')
		setImage()
	}

	const handleBack = () => {
		setActivePage('create')
	}
	
	const handleSubmit = async () => {
		setLoading(true);
		const campsite = {
			title: title,
			description: description,
			price: price,
			owner: user.uid,
		}
		const res = await addCampsite({campsite: campsite, image: image});
		res.uploadTask.on('state_changed', snapshot => {
			const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			setProgress(progress);
		}, 
		error => console.log(error), 
		() => {
			handleReset()
		})
		
	}

	const api = {
		activePage,
		setActivePage,
		title, 
		setTitle,
		description, setDescription,
		price,
		setPrice,
		image,
		setImage,
		previewImage,
		setPreviewImage,
		progress,
		setProgress,
		loading,
		setLoading,
		handleBack,
		handleReset,
		handleConfirm,
		handleSubmit
	}

      return (
		<CampsiteCreatorContainer style={{width: '100%', height: '200px', marginBottom: '5px'}}>
			<CreatorAPI.Provider value={api}>
				<CSSTransition
					in={activePage === 'start' }
					classNames="page"
					timeout={200}
					unmountOnExit

				>
					<CampsiteCreatorStart/>
				
				</CSSTransition>
				<CSSTransition
					in={activePage === 'create' }
					classNames="page"
					timeout={200}
					unmountOnExit

				>
					<CampsiteCreatorCreate/>
				</CSSTransition>
				<CSSTransition
					in={activePage === 'review' }
					classNames="page"
					timeout={200}
					unmountOnExit

				>
					<CampsiteCreatorReview />
				</CSSTransition>
			</CreatorAPI.Provider>
            </CampsiteCreatorContainer>
      )
}

export const CreatorAPI = createContext(null)

export default CampsiteCreator
