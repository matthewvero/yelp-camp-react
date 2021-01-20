import React, { useEffect, useState } from "react";
import { PageContainer } from "../page.styles";
import {ContentContainer, ResponsivePageContainer} from '../../components/misc/containers.styles'
import { CampsiteImageCarousel, CampsitePageGrid, CampsitePageInfoGrid } from "./campsitepage.styles";
import { useCampsiteImageURLS, useGetCampsite, useLikeListener } from "../../utils/campsite-hooks";
import { LoadingWaves, Wave } from "../../components/misc/loadinganimations.styles";
import ImageCarousel from "../../components/imagecarousel/imagecarousel.component";
import { SubTitle, Text, Title, SubText } from "../../components/misc/text.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import LikeButton from '../../components/likebutton/like-button.component'
import ReviewsSection from "../../components/reviewssection/reviews-section.component";
import CommentSection from "../../components/commentsection/comment-section.component";
import { faStar } from "@fortawesome/free-solid-svg-icons";
const CampsitePage = (props) => {
	const [loading, setLoading] = useState(true);
	const campsite = useGetCampsite(props.match.params.id);
	const images = useCampsiteImageURLS(props.match.params.id);
	const user = useSelector(state => state.authReducer.user)
	const {likedBy} = useLikeListener(campsite)

	useEffect(() => {
		campsite && images.length ? setLoading(false) : setLoading(true)
	}, [campsite, images])

	

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
							
							<CommentSection campsiteID={props.match.params.id} userID={user.uid}/>
							<ReviewsSection campsiteID={props.match.params.id} userID={user.uid}/>
						
						</CampsitePageGrid>
				</ResponsivePageContainer>
			}
			
		</PageContainer>
	)
	;
};

export default CampsitePage;
