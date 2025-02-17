import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Style from "./Layout.module.css";
import { useContext, useEffect } from "react";
import { UserContext } from "../../Context/UserContext";

export default function Layout() {

	let {setUserToken}= useContext(UserContext);
	
	useEffect( ()=> {
		if(localStorage.getItem('userToken') !== null) {
			setUserToken(localStorage.getItem('userToken'));
		}
	}, [])

	return (
		<>
			<Navbar />
			<Outlet />
			<Footer />
		</>
	);
}
