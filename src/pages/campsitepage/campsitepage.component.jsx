import React, { useEffect, useState } from "react";
import { PageContainer } from "../page.styles";
import {ContentContainer, ResponsivePageContainer} from '../../components/misc/containers.styles'
import { CampsiteImageCarousel, CampsitePageGrid, CampsitePageInfoGrid } from "./campsitepage.styles";
import { useCampsiteImageURLS, useGetCampsite } from "../../utils/campsite-hooks";
import { LoadingWaves, Wave } from "../../components/misc/loadinganimations.styles";
import ImageCarousel from "../../components/imagecarousel/imagecarousel.component";
import { SubTitle, Text, Title, SubText } from "../../components/misc/text.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import {db} from '../../firebase'
const CampsitePage = (props) => {
	const [loading, setLoading] = useState(true);
	const campsite = useGetCampsite(props.match.params.id);
	const images = useCampsiteImageURLS(props.match.params.id);
	
	useEffect(() => {
		campsite && images.length ? setLoading(false) : setLoading(true)
	}, [campsite, images])

	useEffect(() => {
		const getUsername = async () => {
			const userRef = await db.collection('userProfiles').doc(campsite.owner).get()
			const user = userRef.data()
			console.log(user)
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
										<FontAwesomeIcon 
											style={{
												justifySelf: 'end', 
												fontSize: '2rem',
												color: 'white',
												margin: '0 10px'
											}} 
											icon={faHeart}
										/>
										<SubTitle>{campsite.likedBy.length}</SubTitle>
									</div>
								</CampsitePageInfoGrid>
							</ContentContainer>
						</CampsitePageGrid>
				</ResponsivePageContainer>
			}
			
		</PageContainer>
	)
	;
};

export default CampsitePage;
