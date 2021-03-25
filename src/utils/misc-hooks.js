import { useEffect } from "react";
import { addImage } from "../firebase.utils";

export const useImageUploader = (
	selectedFile,
	setSelectedFile,
	setLoading,
	url
) => {
	useEffect(() => {
		const uploadImage = async () => {
			setLoading(true);

			try {
				const res = await addImage(selectedFile, url);
				if (res.status === 200) {
					const event = new CustomEvent("alert", {
						detail: "Upload Complete!",
					});
					window.dispatchEvent(event);
				} else {
					throw new Error("Failed to upload Image");
				}
			} catch (err) {
				const event = new CustomEvent("alert", {
					detail: "Something went wrong!" + err.message,
				});
				window.dispatchEvent(event);
			} finally {
				setLoading(false);
				setSelectedFile("");
			}
		};
		if (selectedFile) {
			uploadImage();
		}
	}, [selectedFile, setLoading, setSelectedFile, url]);
};
