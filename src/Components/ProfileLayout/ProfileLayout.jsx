import { Link, Outlet } from "react-router-dom";
import Style from "./ProfileLayout.module.css";

export default function ProfileLayout() {
	return (
		<div className="d-flex justify-content-between align-content-center">
			<nav>
				<ul>
					<Link to={`/profile`}>Profile</Link>
				</ul>
				<ul>
					<Link to={`/profile/addresses`}>Addresses</Link>
				</ul>
				<ul>
					<Link to={`/profile/orders`}>Orders</Link>
				</ul>
			</nav>
			<Outlet />
		</div>
	);
}
