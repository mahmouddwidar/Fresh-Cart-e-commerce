import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Style from "./Layout.module.css";
import { useContext, useEffect } from "react";
import { UserContext } from "../../Context/UserContext";
import { Offline } from "react-detect-offline";

export default function Layout() {
	let { setUserToken } = useContext(UserContext);

	useEffect(() => {
		if (localStorage.getItem("userToken") !== null) {
			setUserToken(localStorage.getItem("userToken"));
		}
	}, []);

	return (
		<>
			<Navbar />
			<div className="container">
				<Outlet />
			</div>
			<div>
				<Offline>
					<div className={`${Style["network-offline"]} border border-danger`}>
						{" "}
						<i className="fa-solid fa-wifi text-danger me-2"></i> You&apos;re
						currently offline
					</div>
				</Offline>
			</div>
			<Footer />
		</>
	);
}
