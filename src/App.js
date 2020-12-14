import React, { useEffect, useState } from "react";
import "./App.css";
import { Switch, Route } from "react-router";
import LandingPage from "./pages/landingpage/landingpage";
import Homepage from "./pages/homepage/homepage";
import Header from "./components/header/header.component";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../src/theme/themes";
import { useDispatch } from "react-redux";
import { auth } from "./firebase";
import { setUser, setUserProfile } from "./redux/auth-redux/auth.actions";
import ProfilePage from "./pages/profilepage/profilepage";

import MainMenu from "./components/mainmenu/main-menu.component";
import { getUserImages } from "./firebase.utils";
import { SignedIn } from "./events/auth-events";
import Tilt from "./components/tilt/tilt.component";

function App() {
	const [darkMode, setDarkmode] = useState(
		localStorage.getItem("darkMode") == "true" ? true : false
	);
	useEffect(() => {
		const localStorageUpdated = () => {
			setDarkmode(
				localStorage.getItem("darkMode") == "true"
					? true
					: false
			);
		};
		window.addEventListener("darkModeChanged", localStorageUpdated);
		return () => {
			window.removeEventListener("darkModeChanged", localStorageUpdated);
		};
	}, []);

	const dispatch = useDispatch();

	useEffect(() => {
		auth.onAuthStateChanged(function (user) {

			if (user) {
				const getImages = async () => {
					const profileImageURLs = await getUserImages("profileImages", user.uid);
					const coverImageURLs = await getUserImages("coverImages", user.uid);
					dispatch(setUserProfile({
						displayName: user.displayName, 
						profilePicture: profileImageURLs, 
						coverImages: coverImageURLs
					}))
				};
				getImages();
				dispatch(setUser(user));
			}
		});
	}, [dispatch]);

	return (
		<div className="App">
			<ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
				<Header />
				
				<MainMenu/>
				<Switch>
					<Route exact path="/" component={LandingPage} />
					<Route exact path="/home" component={Homepage} />
					<Route
						exact
						path="/profile/:id"
						render={(props) => (
							<ProfilePage {...props} isAuthed={true} />
						    )}
					/>
				</Switch>
			</ThemeProvider>
		</div>
	);
}

export default App;
