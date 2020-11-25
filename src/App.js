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
import { setUser } from "./redux/auth-redux/auth.actions";
import ProfilePage from "./pages/profilepage/profilepage";

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
			window.removeEventListener("darkModeChanged");
		};
	}, []);

	const dispatch = useDispatch();

	useEffect(() => {
		auth.onAuthStateChanged(function (user) {
			if (user) {
				dispatch(setUser(user));
			}
		});
	}, [dispatch]);

	return (
		<div className="App">
			<ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
				<Header />
				<Switch>
					<Route exact path="/" component={LandingPage} />
					<Route exact path="/home" component={Homepage} />
					<Route
						exact
						path="/profile"
						component={ProfilePage}
					/>
				</Switch>
			</ThemeProvider>
		</div>
	);
}

export default App;
