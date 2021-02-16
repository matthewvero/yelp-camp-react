import React, { useCallback, useContext, useEffect, useState } from "react";
import { PageContainer } from "../page.styles";
import {ContentContainer, ResponsivePageContainer} from '../../components/misc/containers.styles'
import { CampsiteImageCarousel, CampsitePageGrid, CampsitePageInfoGrid } from "./campsitepage.styles";
import { useCampsiteImageURLS, useLikeListener, useRatingCalculator } from "../../utils/campsite-hooks";
import { LoadingWaves, Wave } from "../../components/misc/loadinganimations.styles";
import ImageCarousel from "../../components/imagecarousel/imagecarousel.component";
import { SubTitle, Text, Title, SubText } from "../../components/misc/text.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import LikeButton from '../../components/likebutton/like-button.component'
import ReviewsSection from "../../components/reviewssection/reviews-section.component";
import CommentSection from "../../components/commentsection/comment-section.component";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useGetUsername } from "../../utils/auth-hooks";
import EditButton from "../../components/editbutton/edit-button.component";
import { FormInputText, FormInputTextArea } from "../../components/inputs/input-text/inputs.styles";
import Button from '../../components/button/button.component'
import { ThemeContext } from "styled-components";
import { getCampsite, updateDocument } from "../../firebase.utils";
const CampsitePage = ({match, history}) => {

	const [loading, setLoading] = useState(true);
	const [campsite, setCampsite] = useState()
	const images = useCampsiteImageURLS(match.params.id);
	const user = useSelector(state => state.authReducer.user);
	const {likedBy} = useLikeListener(campsite, user);
	const userName = useGetUsername(campsite && campsite.owner);
	const {averageRating, reviewCount} = useRatingCalculator(match.params.id);
	const theme = useContext(ThemeContext);

	const memoUpdateCampsite = useCallback(
		() => {
			getCampsite(match.params.id).then(data => {
				setCampsite(data)
			})
		},
		[match.params.id],
	)
	

	// Retrieve Campsite
	useEffect(() => {
		memoUpdateCampsite()
	}, [match.params.id, memoUpdateCampsite]);

	useEffect(() => {
		campsite && images.length ? setLoading(false) : setLoading(true);
	}, [campsite, images]);

	useEffect(() => {
		setTitleValue(campsite && campsite.title)
		setDescriptionValue(campsite && campsite.description)
	}, [campsite])

	// Editing
	const [editing, setEditing] = useState(false);
	const [titleValue, setTitleValue] = useState();
	const [descriptionValue, setDescriptionValue] = useState();
	const handleTitleUpdate = () => {
		updateDocument({...campsite, title: titleValue, description: descriptionValue}, 'campsites', campsite.id);
		setEditing(false);
		memoUpdateCampsite()
	}

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
									<div 
										style={{
											gridColumn: editing ? '1/4' : '1/3', 
											textAlign: 'start',
											display: 'flex',
											alignItems: 'center',
											flexWrap: 'wrap',
											
										}}
									>
										{
											editing ?
											<div style={{width: '90%', position: 'relative'}}>
												<FormInputText 
													style={{padding: '10px', width: '100%', boxSizing: 'border-box'}} 
													value={titleValue} 
													onChange={e => setTitleValue(e.target.value)}
												/>
												<Button 
													style={{
														padding: '10px', 
														backgroundColor: theme.color, 
														position: 'absolute',
														right: '0',
														top: '0',
														borderTopLeftRadius: '0',
														borderBottomLeftRadius: '0'
													}}
													fn={handleTitleUpdate}
												>
													Update
												</Button>
											</div>											:
											<Title 
											>
												{campsite.title}
											</Title>
										}
										{
											user.uid === campsite.owner &&
											<EditButton 
												fn={() => setEditing(!editing)} 
												editing={editing} 
												style={{fontSize: '1.5rem', marginLeft: '10px'}}
											/>
										}
									</div>
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
										{averageRating.toFixed(2)} ({reviewCount} Reviews) 
										• 
										Hosted By: <span onClick={() => history.push(`/profile/${campsite.owner}`)} style={{color: theme.color, cursor: 'pointer'}}>{userName}</span>

									</SubText>
									
									<div 
										style={{
											gridColumn: editing ? '1/4' : '1/3', 
											textAlign: 'start',
											display: 'flex',
											alignItems: 'flex-start',
											flexWrap: 'wrap',
											height: '100%'
										}}
									>
										{
											editing ?
											<div style={{width: '90%', position: 'relative'}}>
												<FormInputTextArea 
													style={{padding: '10px', width: '100%', boxSizing: 'border-box'}} 
													value={descriptionValue} 
													onChange={e => setDescriptionValue(e.target.value)}
												/>
											</div>											
											:
											<Text 
											style={{
												width: '100%', 
												textAlign: 'start'
											}}
											>
												{campsite.description}
											</Text>
										}
									</div>
									{
										!editing &&
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
									}
								</CampsitePageInfoGrid>
							</ContentContainer>
							
							<CommentSection campsiteID={match.params.id} userID={user.uid}/>
							<ReviewsSection campsiteID={match.params.id}/>
						
						</CampsitePageGrid>
				</ResponsivePageContainer>
			}
			
		</PageContainer>
	)
	;
};

export default CampsitePage;
