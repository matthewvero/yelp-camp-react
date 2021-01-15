import React, { useEffect, useState } from "react";
import { PageContainer } from "../page.styles";
import {ContentContainer, ResponsivePageContainer} from '../../components/misc/containers.styles'
import { CampsiteImageCarousel, CampsitePageCommentSection, CampsitePageGrid, CampsitePageInfoGrid } from "./campsitepage.styles";
import { useCampsiteImageURLS, useGetCampsite, useLikeListener } from "../../utils/campsite-hooks";
import { LoadingWaves, Wave } from "../../components/misc/loadinganimations.styles";
import ImageCarousel from "../../components/imagecarousel/imagecarousel.component";
import { SubTitle, Text, Title, SubText } from "../../components/misc/text.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faPen, faStar } from "@fortawesome/free-solid-svg-icons";
import {db} from '../../firebase'
import { useSelector } from "react-redux";
import LikeButton from '../../components/likebutton/like-button.component'
import { FormInputText } from "../../components/inputs/input-text/inputs.styles";
import { addComment } from "../../firebase.utils";
import { useCommentListener } from '../../utils/comment-hooks';
import Comment from "../../components/comment/comment.component";
const CampsitePage = (props) => {
	const [loading, setLoading] = useState(true);
	const campsite = useGetCampsite(props.match.params.id);
	const images = useCampsiteImageURLS(props.match.params.id);
	const user = useSelector(state => state.authReducer.user)
	const {likedBy} = useLikeListener(campsite)
	const [commentInput,setCommentInput] = useState('');
	const comments = useCommentListener(props.match.params.id);

	const handleCommentSubmit = () => {
		addComment(user.uid, commentInput, campsite.id);
		setCommentInput('');
	}

	useEffect(() => {
		campsite && images.length ? setLoading(false) : setLoading(true)
	}, [campsite, images])

	useEffect(() => {
		const getUsername = async () => {
			const userRef = await db.collection('userProfiles').doc(campsite.owner).get()
			const user = userRef.data()
			// finish this
		}
		campsite &&
		getUsername()
		
	}, [campsite])

	return (
		<PageContainer>
			{
			loading ?
				<LoadingWaves>
					<Wave/>
					<Wave delay='500'/>
				</LoadingWaves>
			:
				<ResponsivePageContainer>
					<CampsitePageGrid>
					
						<CampsiteImageCarousel>
							<ImageCarousel images={images}/>
						</CampsiteImageCarousel>
							<ContentContainer >
								
								<CampsitePageInfoGrid>
									<Title style={{
										gridColumn: '1/3', 
										textAlign: 'start'
									
									}}
									>
										{campsite.title}
									</Title>
									<SubText
										style={{
											gridColumn: '1/3', 
											alignSelf: 'start', 
											textAlign: 'start'
										}}
									>
										<FontAwesomeIcon 
											style={{color: 'dodgerblue', margin: '0 5px 0 0'}}
											icon={faStar}
										/>
										5 (317) 
										• 
										Hosted By: 
										{

										}

									</SubText>
									<Text 
										style={{
											gridColumn: '1/3', 
											alignSelf: 'start', 
											textAlign: 'start'
										}}
									>
										{campsite.description}
									</Text>
									<div
										style={{
											gridColumn: '3/4', 
											gridRow: '1/2',
											display: 'flex',
											justifyContent: "flex-end",
											alignContent: 'center'
										}} 
									>
										<LikeButton style={{margin: '0 10px'}} user={user} campsite={campsite}/>
										<SubTitle>{likedBy.length}</SubTitle>
									</div>
								</CampsitePageInfoGrid>
							</ContentContainer>
							<ContentContainer style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: "center"}}>
								<FormInputText 
									placeholder='Add a Comment...' 
									style={{
										width: '80%', 
										padding: '15px 20px', 
										justifySelf: 'flex-start',
										borderTopRightRadius: '0',
										borderBottomRightRadius: '0'
									}}
									value={commentInput}
									onChange={e => setCommentInput(e.target.value)}
									onKeyDown={e => e.key === 'Enter' && handleCommentSubmit()}
								/>
								{
									commentInput ? 
									<div
										style={{
											height: '54px',
											width: '10%',
											backgroundColor: 'dodgerblue',
											borderTopRightRadius: '10px',
											borderBottomRightRadius: '10px',
											display: "flex",
											alignItems: 'center',
											justifyContent: 'center',
											cursor: 'pointer'
										}}
										onPointerDown={() => handleCommentSubmit()}
									>
										<FontAwesomeIcon icon={faPaperPlane} style={{color: "white", fontSize: '1.7rem', }}/>
									</div>
									:
									<div
										style={{
											height: '54px',
											width: '10%',
											backgroundColor: 'grey',
											borderTopRightRadius: '10px',
											borderBottomRightRadius: '10px',
											display: "flex",
											alignItems: 'center',
											justifyContent: 'center',
											cursor: 'pointer'
										}}
									>
										<FontAwesomeIcon icon={faPen} style={{color: "white", fontSize: '1.7rem', }}/>
									</div>
								}
								<CampsitePageCommentSection>
									{
										comments.map(el => (
											<Comment data={el} user={user}/>
										))
									}
									
								</CampsitePageCommentSection>
							</ContentContainer>
						</CampsitePageGrid>
				</ResponsivePageContainer>
			}
			
		</PageContainer>
	)
	;
};

export default CampsitePage;
