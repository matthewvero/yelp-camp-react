import React, { useState } from "react";
import LoadingAnimation from "../loadinganimation/loadinganimation.component";
const withLoader = (Wrappedcomponent) => {
	return ({ ...props }) => {
		const [loading, setLoading] = useState(false);
		const [transparency, setTransparency] = useState(false);
		return loading ? (
			<LoadingAnimation transparency={transparency} />
		) : (
			<Wrappedcomponent
				setLoading={setLoading}
				loading={loading}
				setTransparency={setTransparency}
				{...props}
			/>
		);
	};
};

export default withLoader;
