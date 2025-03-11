import { createContext, useState, useEffect } from "react";

export let UserContext = createContext();

export default function UserContextProvider(props) {
	const [userToken, setUserToken] = useState(
		localStorage.getItem("userToken") || null
	);
	const [userData, setUserData] = useState(
		JSON.parse(localStorage.getItem("userData")) || null
	);

	useEffect(() => {
		if (userData) {
			localStorage.setItem("userData", JSON.stringify(userData));
		} else {
			localStorage.removeItem("userData");
		}
	}, [userData]);

	return (
		<UserContext.Provider
			value={{ userToken, setUserToken, userData, setUserData }}
		>
			{props.children}
		</UserContext.Provider>
	);
}
