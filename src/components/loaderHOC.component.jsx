import React, { useState } from "react";
import LoadingAnimation from "./loadinganimation/loadinganimation.component";

const withLoader = (WrappedComponent) => {
	return ({ ...props }) => {
		const [loading, setLoading] = useState(false);
		const [transparency, setTransparency] = useState(false);
		return (
			<React.Fragment>
				{loading && (
					<LoadingAnimation transparency={transparency} />
				)}
				<WrappedComponent
					loading={loading}
					setLoading={setLoading}
					setTransparency={setTransparency}
					{...props}
				/>
			</React.Fragment>
		);
	};
};

export default withLoader;
