import { NavLink, Outlet } from "react-router-dom";
import Style from "./ProfileLayout.module.css";

export default function ProfileLayout() {
	return (
		<div className="d-flex">
			{/* Sidebar Navigation */}
			<nav className={`${Style["side-navbar"]} col-md-2 staggered-animation`} style={{ '--i': 1 }}>
				<NavLink
					to="/profile"
					end
					className={({ isActive }) =>
						`staggered-animation ${Style["nav-item"]} ${isActive ? Style["active"] : ""}`
					}
					style={{ '--i': 2 }}
				>
					<span className={`${Style['icon']}`} >👤</span> Profile
				</NavLink>

				<NavLink
					to="/profile/addresses"
					end
					className={({ isActive }) =>
						`staggered-animation ${Style["nav-item"]} ${isActive ? Style["active"] : ""}`
					}
					style={{ '--i': 3 }}
				>
					<span className={`${Style['icon']}`} >🏠</span> Addresses
				</NavLink>

				<NavLink
					to="/profile/allorders"
					end
					className={({ isActive }) =>
						`staggered-animation ${Style["nav-item"]} ${isActive ? Style["active"] : ""}`
					}
					style={{ '--i': 4 }}
				>
					<span className={`${Style['icon']}`} >📦</span> Orders
				</NavLink>
				<NavLink
					to="/profile/wishlist"
					end
					className={({ isActive }) =>
						`staggered-animation ${Style["nav-item"]} ${isActive ? Style["active"] : ""}`
					}
					style={{ '--i': 5 }}
				>
					<i className="fa-solid fa-heart" style={{ color: "#dc3545" }}></i> Whish List
				</NavLink>
			</nav>

			{/* Main Content */}
			<div className="flex-grow-1 p-4 staggered-animation" style={{ '--i': 5 }}>
				<Outlet />
			</div>
		</div>
	);
}
