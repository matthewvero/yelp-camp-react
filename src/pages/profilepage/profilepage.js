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
import About from "../../components/about/about.component";
import { Title } from "../../components/misc/text.styles";
import {
	CoverPictureResponsiveContainer,
	ProfilePictureResponsiveContainer,
	UserNameBar,
} from "./profilepage.styles";
import { useProfileListener } from "../../utils/auth-hooks";
const ProfilePage = ({ match }) => {
	const user = useSelector((state) => state.authReducer.user);
	const userProfile = useProfileListener(match.params.uid);
	const [camps, setCamps] = useState();

	const [editable, setEditable] = useState(false);

	useEffect(() => {
		let unsub;
		const setUserProfile = async () => {
			unsub = getUserCampsites(setCamps, match.params.uid);
		};

		setEditable(user.uid === match.params.uid);
		setUserProfile().then(() => {
			return () => unsub();
		});
	}, [match.params.uid, user.uid]);

	return (
		<PageContainer>
			<CoverPictureResponsiveContainer>
				<CoverPicture
					editable={editable}
					userID={match.params.uid}
					images={userProfile.coverimages}
				/>

				<ProfilePictureResponsiveContainer>
					<ProfilePicture
						editable={editable}
						userID={match.params.uid}
						images={userProfile.profileimages}
					/>
				</ProfilePictureResponsiveContainer>
			</CoverPictureResponsiveContainer>

			<ResponsivePageContainer>
				<UserNameBar>
					<Title>{userProfile.displayname}</Title>
				</UserNameBar>
			</ResponsivePageContainer>

			<ResponsivePageContainer
				style={{
					height: "auto",
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "start",
					flexWrap: "wrap",
				}}
			>
				<ResponsiveContentContainer $width="34%">
					<About
						profileInfo={userProfile}
						editable={editable}
					/>
				</ResponsiveContentContainer>

				<ResponsiveContentContainer $width="65%">
					{editable && <CampsiteCreator />}

					<div
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "space-between",
							width: "100%",
							overflowY: "scroll",
							overflowX: "visible",
						}}
					>
						{camps &&
							camps.map((el) => (
								<CampsiteCardLong
									campsite={el}
									key={el.uid}
								/>
							))}
					</div>
				</ResponsiveContentContainer>
			</ResponsivePageContainer>
		</PageContainer>
	);
};

export default withRouter(ProfilePage);
