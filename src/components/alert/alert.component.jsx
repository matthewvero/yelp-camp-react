import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { AlertContainer } from "./alert.styles";
import Button from "../button/button.component";
const Alert = () => {
	const alertRef = useRef();
	const [alert, setAlert] = useState("");
	const handleAlert = (e) => {
		if (e.detail) {
			setAlert(e.detail);
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
			nodeRef={alertRef}
		>
			<AlertContainer ref={alertRef}>
				<h1 style={{ color: "dodgerblue" }}>{alert}</h1>
				<Button
					style={{ padding: "20px" }}
					fn={() => setAlert("")}
				>
					Okay
				</Button>
			</AlertContainer>
		</CSSTransition>
	);
};

export default Alert;
