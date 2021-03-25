import React, { useContext, useState } from "react";
import { useGetUsername } from "../../utils/auth-hooks";
import { HR } from "../misc/containers.styles";
import { Text } from "../misc/text.styles";
import Button from "../button/button.component";
import { FormInputTextArea } from "../inputs/input-text/inputs.styles";
import { ThemeContext } from "styled-components";
import { deleteDocument, updateDocument } from "../../firebase.utils";
const Comment = ({ data, userID }) => {
	const [editing, setEditing] = useState(false);
	const username = useGetUsername(data.userID);
	const [inputValue, setInputValue] = useState("");
	const handleEditing = () => {
		setEditing(true);
	};
	const handleCancel = () => {
		setEditing(false);
		setInputValue("");
	};
	const inputButtonStyle = { padding: "3px 10px", margin: "0 5px" };
	const theme = useContext(ThemeContext);

	const handleUpdate = async () => {
		if (data.comment !== inputValue) {
			try {
				await updateDocument(
					{
						...data,
						comment: inputValue,
					},
					"comments",
					data.uid
				);
			} catch (err) {
				const event = new CustomEvent("alert", {
					detail: `Something went wrong! ` + err.message,
				});
				window.dispatchEvent(event);
			} finally {
				setEditing(false);
			}
		} else {
			alert("Comment can not be the same");
		}
	};

	const handleDelete = () => {
		const ans = window.confirm(
			"Are you sure you would like to delete this comment?"
		);
		if (ans) {
			deleteDocument("comments", data.uid);
		}
	};
	return (
		<React.Fragment>
			<div
				style={{
					height: "auto",
					display: "flex",
					flexWrap: "wrap",
					justifyContent: "flex-start",
					width: "100%",
				}}
			>
				{editing ? (
					<FormInputTextArea
						type="text"
						value={inputValue}
						onFocus={() => setInputValue(data.comment)}
						onChange={(e) =>
							setInputValue(e.target.value)
						}
						style={{ padding: "0" }}
						autoFocus
					/>
				) : (
					<Text>
						{data.comment}{" "}
						<span style={{ color: "#999999" }}>
							- {username}
						</span>
					</Text>
				)}

				{userID === data.userID && (
					<div
						style={{
							marginLeft: "auto",
							color: "white",
							display: "flex",
						}}
					>
						{editing && (
							<Button
								fn={handleUpdate}
								style={{
									...inputButtonStyle,
									backgroundColor:
										theme.color,
								}}
							>
								Update
							</Button>
						)}
						{editing ? (
							<Button
								style={inputButtonStyle}
								fn={handleCancel}
							>
								Cancel
							</Button>
						) : (
							<React.Fragment>
								<Button
									style={inputButtonStyle}
									fn={handleEditing}
								>
									Edit
								</Button>
								<Button
									style={{
										...inputButtonStyle,
										color:
											"rgb(255, 100, 100)",
									}}
									fn={handleDelete}
								>
									Delete
								</Button>
							</React.Fragment>
						)}
					</div>
				)}
			</div>
			<HR />
		</React.Fragment>
	);
};

export default Comment;
