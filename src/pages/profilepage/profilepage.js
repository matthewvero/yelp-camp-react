import React, { useEffect, useState } from "react";
import {
	ResponsiveContentContainer,
	ResponsivePageContainer,
} from "../../components/misc/containers.styles";
import { PageContainer } from "../page.styles";
import ProfilePicture from "../../components/profilepicture/profilepicture.component";
import CampsiteCreator from "../../components/campsitecreator/campsite-creator.component";
import { useSelector } from "react-redux";
import CampsiteCardLong from "../../components/campsitecardlong/campsite-card-long.component";
import CoverPicture from "../../components/coverpicture/coverpicture.component";
import { getUserCampsites } from "../../firebase.utils";
import { withRouter } from "react-router";
import About from '../../components/about/about.component'
import { Title } from "../../components/misc/text.styles";
import { CoverPictureResponsiveContainer, ProfilePictureResponsiveContainer, UserNameBar } from "./profilepage.styles";
import { db } from "../../firebase";
const ProfilePage = ({match}) => {
	
	const user = useSelector((state) => state.authReducer.user);
	const userProfile = useSelector((state) => state.authReducer.userProfile);
	const [camps, setCamps] = useState();
	const [profileInfo, setProfileInfo] = useState({});
	const [editable, setEditable] = useState(false);
	// const [editing, setEditing] = useState(false)
	// Finish this

	useEffect(() => {
		const setUserProfile = async () => {
			
			if(user.uid === match.params.id) {
				setProfileInfo({...userProfile, displayName: user.displayName})
				setEditable(true);
			} else {
				const collectionRef = db.collection('campsites');
				const camps = await collectionRef
				.where('owner', '==', match.params.id).get();
				setCamps(camps.docs.map(el => el.data()));
			}

		} 
		setUserProfile()
		const unsub = getUserCampsites(setCamps, match.params.id);
		if (unsub) {
			return () => unsub();
		}
	}, [match, user.displayName, user.uid, userProfile]);

	return (
		<PageContainer>
			<CoverPictureResponsiveContainer
>
				<CoverPicture editable={editable} userID={match.params.id}/>

				<ProfilePictureResponsiveContainer>
					<ProfilePicture editable={editable} userID={match.params.id}/>
				</ProfilePictureResponsiveContainer>
			</CoverPictureResponsiveContainer>

			<ResponsivePageContainer>
				<UserNameBar>
					<Title >
						{profileInfo.displayName}
					</Title>
				</UserNameBar>
			</ResponsivePageContainer>

			<ResponsivePageContainer
				style={{
					height: "auto",
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "start",
					flexWrap: 'wrap'
				}}
			>
				<ResponsiveContentContainer $width='34%'>
					<About profileInfo={profileInfo} editable={editable}/>
				</ResponsiveContentContainer>

				<ResponsiveContentContainer
					$width='65%'
				>
					{editable &&
						<CampsiteCreator />
					}

					<div
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "space-between",
							width: "100%",
							overflowY: "scroll",
							overflowX: 'visible'
						}}
					>
						{
							camps &&
							camps.map((el) => (
								<CampsiteCardLong
									campsite={el}
									key={el.id}
								/>
							))
						}

					</div>
				</ResponsiveContentContainer>
			</ResponsivePageContainer>
		</PageContainer>
	);
};

export default withRouter(ProfilePage);
