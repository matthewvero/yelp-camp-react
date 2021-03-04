import React, { useEffect } from "react";
import "./App.css";
import { Switch, Route } from "react-router";
import LandingPage from "./pages/landingpage/landingpage";
import Homepage from "./pages/homepage/homepage";
import Header from "./components/header/header.component";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../src/theme/themes";
import ProfilePage from "./pages/profilepage/profilepage";

import MainMenu from "./components/mainmenu/main-menu.component";
import { useDarkMode } from "./utils/ui-hooks";
import { useAuthListener } from "./utils/auth-hooks";
import CampsitePage from "./pages/campsitepage/campsitepage.component";

function App() {
	const darkMode = useDarkMode();

	useAuthListener();

	// const helloWorld = async () => {
	// 	try {
	// 		const data = await fetch(
	// 			"http://localhost:5001/yelpcamp-d57d1/us-central1/getResizedImage/?w=100"
	// 		);
	// 		const result = await data.text();
	// 		return result;
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// };

	// useEffect(() => {
	// 	helloWorld().then((data) => console.log(data));
	// }, []);

	return (
		<div className="App">
			<ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
				<Header />

				<MainMenu />
				<Switch>
					<Route exact path="/" component={LandingPage} />
					<Route exact path="/home" component={Homepage} />
					<Route
						exact
						path="/profile/:id"
						render={(props) => (
							<ProfilePage
								{...props}
								isAuthed={true}
							/>
						)}
					/>
					<Route
						exact
						path="/campsite/:id"
						render={(props) => (
							<CampsitePage {...props} />
						)}
					/>
				</Switch>
			</ThemeProvider>
		</div>
	);
}

export default App;
