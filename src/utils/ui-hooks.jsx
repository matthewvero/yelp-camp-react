import React, { useEffect, useState } from "react";

export function useDarkMode() {
	const [isDark, setIsDark] = useState();

	useEffect(() => {
		// Check for local storage value and convert to boolean
		const localStorageValue =
			localStorage.getItem("darkMode") === "true" ? true : false;

		// update state based on new local storage value
		const localStorageUpdated = () => {
			setIsDark(
				localStorage.getItem("darkMode") === "true"
					? true
					: false
			);
		};
		const matcher = window.matchMedia("(prefers-color-scheme: dark)");

		// prioritise local settings over global settings
		if (localStorageValue === true) {
			setIsDark(true);
		} else if (localStorageValue === false) {
			setIsDark(false);
		} else if (matcher) {
			setIsDark(true);
		} else {
			setIsDark(false);
		}

		// listen for changes from themetogglebutton
		window.addEventListener("darkModeChanged", localStorageUpdated);
		return () => {
			window.removeEventListener(
				"darkModeChanged",
				localStorageUpdated
			);
		};
	}, []);

	return isDark;
}
export function useClickOutside(visible, ref, callback) {
	useEffect(() => {
		function handleClickOutside(event) {
			// Close menu when clicked outside
			visible && !ref.current.contains(event.target) && callback();
		}

		// Bind the event listener
		document.addEventListener("click", handleClickOutside);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener("click", handleClickOutside);
		};
	}, [callback, ref, visible]);
}

export function usePreloadImages(images, style) {
	const [imagesArr, setImagesArr] = useState([]);

	useEffect(() => {
		if (images && images.length) {
			const imgArr = [];
			images.forEach((el) => {
				const img = new Image();
				img.onload = () => {
					imgArr.push(
						<img
							style={{
								height: "100%",
								width: "100%",
								minHeight: "100%",
								minWidth: "100%",
								objectFit: "cover",
								...style,
							}}
							src={el}
							alt=" "
						/>
					);
				};
				img.src = el;
			});
			setImagesArr(imgArr);
			return;
		}
		setImagesArr([]);
		return;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [images]);
	return imagesArr;
}

export function useElementDimensions(ref) {
	const [dimensions, setDimensions] = useState(null);
	useEffect(() => {
		if (ref) {
			setDimensions({
				height: ref.offsetHeight,
				width: ref.offsetWidth,
			});
		}
	}, [ref]);
	return dimensions;
}

// Resize image to dimensions of provided ref
// Append any custom formatting to url
export function useImageResize(images, ref, format) {
	const [resizedImages, setResizedImages] = useState([]);
	useEffect(() => {
		const height = ref.current.offsetHeight;
		const width = ref.current.offsetWidth;
		let imageLinks = [];

		if (images && ref) {
			imageLinks = images.map((image) => {
				const formatStr = `${image.link}?w=${width + 100}`;
				if (format) {
					let newStr;
					for (const key in format) {
						newStr = formatStr.concat(
							`&${key}=${format[key]}`
						);
					}
					return newStr;
				} else {
					return formatStr;
				}
			});
		}
		setResizedImages(imageLinks);
	}, [images, ref]);
	return resizedImages;
}
