import axios from "axios";
import { createContext, useContext } from "react";
import { UserContext } from "./UserContext";

export let AddressesContext = createContext();

export default function AddressesContextProvider(props) {
	let { userToken } = useContext(UserContext);

	function getLoggedUserAddresses() {
		return axios
			.get(`https://ecommerce.routemisr.com/api/v1/addresses`, {
				headers: {
					token: userToken,
				},
			})
			.then((response) => response)
			.catch((error) => error);
	}

	function removeAddress(addressId) {
		return axios
			.delete(`https://ecommerce.routemisr.com/api/v1/addresses/${addressId}`, {
				headers: {
					token: userToken,
				},
			})
			.then((response) => response)
			.catch((error) => error);
	}

	return (
		<AddressesContext.Provider value={{ getLoggedUserAddresses, removeAddress }}>
			{props.children}
		</AddressesContext.Provider>
	);
}
