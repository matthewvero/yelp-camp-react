import React, { useEffect, useState } from "react";

export function useDarkMode() {

      const [isDark, setIsDark] = useState();
     
      useEffect(() => {
            // Check for local storage value and convert to boolean
            const localStorageValue = localStorage.getItem("darkMode") === "true" ? true : false;

            // update state based on new local storage value
            const localStorageUpdated = () => {
                  setIsDark(localStorage.getItem('darkMode') === "true" ? true : false);
            };
            const matcher = window.matchMedia('(prefers-color-scheme: dark)');

            // prioritise local settings over global settings
            if(localStorageValue === true) {
                  setIsDark(true);
            } else if (localStorageValue === false) {
                  setIsDark(false);
            }else if (matcher) {
                  setIsDark(true);
            } else {
                  setIsDark(false);
            }
            
            // listen for changes from themetogglebutton
            window.addEventListener("darkModeChanged", localStorageUpdated);
            return () => {
                  window.removeEventListener("darkModeChanged", localStorageUpdated);
            };
      }, []);

      return isDark;
}
export function useClickOutside(callback, visible, ref) {

      useEffect(() => {
            function handleClickOutside(event) {
                  // Close menu when clicked outside
                  visible  &&
                  !ref.current.contains(event.target) &&
                  callback()
            }

            // Bind the event listener
            document.addEventListener("click", handleClickOutside);
            return () => {
                  // Unbind the event listener on clean up
                  document.removeEventListener("click", handleClickOutside);
            };
      }, [callback, ref, visible]);
}

export function usePreloadImages(images) {
      const [imagesArr, setImagesArr] = useState([]);
      let loadedImages = [];
      useEffect(() => {
            
            images &&
		images.forEach(el => {
			const img = new Image();
			img.onload = () => {
				setImagesArr(imagesArr => imagesArr.concat(
					<img
						style={{
							height: "100%",
                                          width: "100%",
                                          minHeight: '100%',
                                          minWidth: '100%',
                                          objectFit: "cover",
						}}
						src={el}
						alt=" "
					/>

                        )
                        );
                        
			};
			img.src = el;
            });
		setImagesArr(loadedImages);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [images]);
      return imagesArr
}

