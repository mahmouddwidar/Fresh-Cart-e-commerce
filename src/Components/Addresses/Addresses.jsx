import { Link } from "react-router-dom";
import Style from "./Addresses.module.css";

export default function Addresses() {
	return (
		<>
			<h1>Addresses</h1>
			<Link to={`/profile/addresses/add-address`} className={`${Style['add-address']}`}><i className="fa-solid fa-plus"></i> Add Address</Link>
		</>
	);
}
