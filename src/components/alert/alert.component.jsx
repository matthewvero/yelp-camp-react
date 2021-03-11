import React, { useEffect } from "react";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { AlertContainer } from "./alert.styles";

const Alert = () => {
	const [alert, setAlert] = useState("");
	const handleAlert = (e) => {
		if (e.detail) {
			setAlert(e.detail);
			setTimeout(() => setAlert(""), 1000);
		}
	};
	useEffect(() => {
		window.addEventListener("alert", handleAlert);
		return () => {
			window.removeEventListener("alert", handleAlert);
		};
	}, []);
	return (
		<CSSTransition
			in={alert.length ? true : false}
			classNames="alert"
			timeout={1000}
			unmountOnExit
		>
			<AlertContainer>
				<h1 style={{ color: "dodgerblue" }}>{alert}</h1>
			</AlertContainer>
		</CSSTransition>
	);
};

export default Alert;
